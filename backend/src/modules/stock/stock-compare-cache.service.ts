import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { QUEUE_STOCK_MODEL_TRAINING } from '../../common/type/constants';
import { STOCK_COMPARE_CONFIG, TRAIN_EVENT } from './constants';
import { StockPredictionService } from './stock-prediction.service';

interface CompareModelRaw {
  name?: string;
  accuracy?: number;
  mae?: number;
  rmse?: number;
  mape?: number;
  predictionDate?: string | null;
}

const REMOVED_MODEL_NAMES = new Set(['extra_trees']);

export interface CompareModelAggregate {
  name: string;
  accuracy: number;
  mae: number;
  rmse: number;
  mape: number;
  predictionDate: string | null;
  samples: number;
}

@Injectable()
export class StockCompareCacheService implements OnModuleInit {
  private readonly logger = new Logger(StockCompareCacheService.name);
  private isRefreshing = false;
  private tableEnsured = false;
  private lastTriggerAt = 0;
  private readonly minTriggerIntervalMs = 60 * 1000;

  constructor(
    private readonly stockPredictionService: StockPredictionService,
    private readonly prismaService: PrismaService,
    @Inject(QUEUE_STOCK_MODEL_TRAINING)
    private readonly client: ClientProxy,
  ) {}

  async onModuleInit(): Promise<void> {
    this.triggerRefreshEvent('module_init');
  }

  @Cron(STOCK_COMPARE_CONFIG.CRON_EXPRESSION)
  refreshCompareByCron() {
    this.triggerRefreshEvent('cron');
  }

  triggerRefreshEvent(source: string): boolean {
    const now = Date.now();
    if (now - this.lastTriggerAt < this.minTriggerIntervalMs) {
      this.logger.log(
        `Skip refresh trigger (${source}) due to cooldown ${this.minTriggerIntervalMs}ms`,
      );
      return false;
    }

    this.lastTriggerAt = now;
    this.client
      .emit(TRAIN_EVENT, {
      source,
      requested_at: new Date(now).toISOString(),
      })
      .subscribe({
        next: () => undefined,
        error: (error: unknown) =>
          this.logger.error(
            `Failed to emit ${TRAIN_EVENT} from ${source}: ${String(error)}`,
          ),
      });

    this.logger.log(`Triggered ${TRAIN_EVENT} from source=${source}`);
    return true;
  }

  async refreshAllTickersCompare(): Promise<void> {
    if (this.isRefreshing) {
      this.logger.warn('Compare summary refresh is already running, skip');
      return;
    }

    this.isRefreshing = true;
    const startedAt = Date.now();
    let successTickers = 0;
    const modelBuckets = new Map<
      string,
      {
        samples: number;
        accuracySum: number;
        maeSum: number;
        rmseSum: number;
        mapeSum: number;
        latestPredictionDate: string | null;
      }
    >();

    try {
      await this.ensureSummaryTable();

      for (const ticker of STOCK_COMPARE_CONFIG.TICKERS) {
        const response = await this.stockPredictionService.compareModels(
          ticker,
          STOCK_COMPARE_CONFIG.RECENT_DAYS,
        );

        if (!response.success) {
          this.logger.warn(
            `Compare refresh failed for ${ticker}: ${response.error}`,
          );
          continue;
        }

        successTickers += 1;
        const results = ((response as any).results || []) as CompareModelRaw[];
        this.accumulateModelResults(modelBuckets, results);
      }

      const models = this.toAggregatedModels(modelBuckets);
      const failedTickers = STOCK_COMPARE_CONFIG.TICKERS.length - successTickers;
      const nowIso = new Date().toISOString();

      const rfModel = models.find((model) => model.name === 'random_forest');
      const rfMeasuredAccuracy = rfModel?.accuracy ?? 0;
      const rfQualifiedByAccuracy =
        rfMeasuredAccuracy >= STOCK_COMPARE_CONFIG.RF_TARGET_THRESHOLD;
      const rfQualifiedBySamples =
        successTickers >= STOCK_COMPARE_CONFIG.RF_MIN_ELIGIBLE_TICKERS;
      const rfQualified = rfQualifiedByAccuracy && rfQualifiedBySamples;

      const rfQualificationReason = rfQualified
        ? 'qualified'
        : !rfModel
          ? 'random_forest_not_found'
          : !rfQualifiedBySamples
            ? `insufficient_eligible_tickers_${successTickers}`
            : 'accuracy_below_threshold';

      const modelsWithMeta = models.map((model) => {
        if (model.name !== 'random_forest') {
          return model;
        }

        return {
          ...model,
          rfTargetThreshold: STOCK_COMPARE_CONFIG.RF_TARGET_THRESHOLD,
          rfMeasuredAccuracy,
          rfQualified,
          rfQualificationReason,
          rfEligibleTickers: successTickers,
          rfMinEligibleTickers: STOCK_COMPARE_CONFIG.RF_MIN_ELIGIBLE_TICKERS,
        };
      });

      await this.prismaService.$executeRawUnsafe(
        `INSERT INTO stock_compare_summaries
        ("id", "recentDays", "totalTickers", "successTickers", "failedTickers", "models", "generatedAt", "createdAt")
        VALUES ($1::uuid, $2::int, $3::int, $4::int, $5::int, $6::jsonb, $7::timestamptz, $8::timestamptz)`,
        randomUUID(),
        STOCK_COMPARE_CONFIG.RECENT_DAYS,
        STOCK_COMPARE_CONFIG.TICKERS.length,
        successTickers,
        failedTickers,
        JSON.stringify(modelsWithMeta),
        nowIso,
        nowIso,
      );

      this.logger.log(
        `Compare summary saved to DB: ${successTickers}/${STOCK_COMPARE_CONFIG.TICKERS.length} tickers, ${Date.now() - startedAt}ms`,
      );
    } finally {
      this.isRefreshing = false;
    }
  }

  async getLatestSummaryFromDb() {
    await this.ensureSummaryTable();
    const rows = await this.prismaService.$queryRawUnsafe<
      Array<{
        recentDays: number;
        totalTickers: number;
        successTickers: number;
        failedTickers: number;
        generatedAt: Date;
        models: unknown;
      }>
    >(
      `SELECT "recentDays", "totalTickers", "successTickers", "failedTickers", "generatedAt", "models"
       FROM stock_compare_summaries
       ORDER BY "createdAt" DESC
       LIMIT 1`,
    );
    const latest = rows[0];

    if (!latest) {
      return null;
    }

    const modelsRaw = Array.isArray(latest.models)
      ? (latest.models as unknown[])
      : [];
    const sanitizedModels = modelsRaw.filter((model) => {
      if (!model || typeof model !== 'object') return false;
      const modelName = String((model as Record<string, unknown>).name || '')
        .trim()
        .toLowerCase();
      return modelName.length > 0 && !REMOVED_MODEL_NAMES.has(modelName);
    });

    const rfModel = sanitizedModels.find((model) => {
      if (!model || typeof model !== 'object') return false;
      const name = String((model as Record<string, unknown>).name || '').toLowerCase();
      return name === 'random_forest';
    }) as Record<string, unknown> | undefined;

    const rfQualified = Boolean(rfModel?.rfQualified);
    const rfMeasuredAccuracy = Number(rfModel?.rfMeasuredAccuracy ?? 0);
    const rfTargetThreshold = Number(
      rfModel?.rfTargetThreshold ?? STOCK_COMPARE_CONFIG.RF_TARGET_THRESHOLD,
    );
    const rfQualificationReason = String(
      rfModel?.rfQualificationReason || 'random_forest_not_found',
    );

    return {
      recent_days: latest.recentDays,
      total_tickers: latest.totalTickers,
      cached_tickers: latest.successTickers,
      failed_tickers: latest.failedTickers,
      generated_at: latest.generatedAt.toISOString(),
      is_refreshing: this.isRefreshing,
      rf_qualified: rfQualified,
      rf_measured_accuracy: rfMeasuredAccuracy,
      rf_target_threshold: rfTargetThreshold,
      rf_qualification_reason: rfQualificationReason,
      models: sanitizedModels,
    };
  }

  private async ensureSummaryTable(): Promise<void> {
    if (this.tableEnsured) return;

    await this.prismaService.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS stock_compare_summaries (
        "id" uuid PRIMARY KEY,
        "recentDays" integer NOT NULL,
        "totalTickers" integer NOT NULL,
        "successTickers" integer NOT NULL,
        "failedTickers" integer NOT NULL,
        "models" jsonb NOT NULL,
        "generatedAt" timestamptz NOT NULL DEFAULT now(),
        "createdAt" timestamptz NOT NULL DEFAULT now()
      )
    `);

    await this.prismaService.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS stock_compare_summaries_created_at_idx
      ON stock_compare_summaries ("createdAt" DESC)
    `);

    this.tableEnsured = true;
  }

  private accumulateModelResults(
    modelBuckets: Map<
      string,
      {
        samples: number;
        accuracySum: number;
        maeSum: number;
        rmseSum: number;
        mapeSum: number;
        latestPredictionDate: string | null;
      }
    >,
    results: CompareModelRaw[],
  ): void {
    for (const model of results) {
      const name = String(model.name || '').trim();
      if (!name) continue;

      const accuracy = Number(model.accuracy ?? 0);
      const mae = Number(model.mae ?? 0);
      const rmse = Number(model.rmse ?? 0);
      const mape = Number(model.mape ?? 0);
      const predictionDateRaw =
        typeof model.predictionDate === 'string' ? model.predictionDate : null;

      const bucket = modelBuckets.get(name) || {
        samples: 0,
        accuracySum: 0,
        maeSum: 0,
        rmseSum: 0,
        mapeSum: 0,
        latestPredictionDate: null,
      };

      bucket.samples += 1;
      bucket.accuracySum += Number.isFinite(accuracy) ? accuracy : 0;
      bucket.maeSum += Number.isFinite(mae) ? mae : 0;
      bucket.rmseSum += Number.isFinite(rmse) ? rmse : 0;
      bucket.mapeSum += Number.isFinite(mape) ? mape : 0;

      if (
        predictionDateRaw &&
        (!bucket.latestPredictionDate ||
          predictionDateRaw > bucket.latestPredictionDate)
      ) {
        bucket.latestPredictionDate = predictionDateRaw;
      }

      modelBuckets.set(name, bucket);
    }
  }

  private toAggregatedModels(
    modelBuckets: Map<
      string,
      {
        samples: number;
        accuracySum: number;
        maeSum: number;
        rmseSum: number;
        mapeSum: number;
        latestPredictionDate: string | null;
      }
    >,
  ): CompareModelAggregate[] {
    const models = Array.from(modelBuckets.entries()).map(([name, bucket]) => ({
      name,
      accuracy: bucket.samples ? bucket.accuracySum / bucket.samples : 0,
      mae: bucket.samples ? bucket.maeSum / bucket.samples : 0,
      rmse: bucket.samples ? bucket.rmseSum / bucket.samples : 0,
      mape: bucket.samples ? bucket.mapeSum / bucket.samples : 0,
      predictionDate: bucket.latestPredictionDate,
      samples: bucket.samples,
    }));

    models.sort((a, b) => b.accuracy - a.accuracy);

    return models;
  }
}
