import { Test, TestingModule } from '@nestjs/testing';
import { StockPredictionService } from './stock-prediction.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('StockPredictionService', () => {
  let service: StockPredictionService;

  const mockPrismaService = {
    history_searching: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      const config: Record<string, string | number> = {
        ML_SERVICE_HOST: 'localhost',
        ML_SERVICE_PORT: 9999,
      };
      return config[key];
    }),
    getOrThrow: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockPredictionService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<StockPredictionService>(StockPredictionService);
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('loadingHistorySearch', () => {
    it('should return history search records', async () => {
      const mockRecords = [
        {
          id: '1',
          symbol: 'AAPL',
          currentPrice: BigInt(150),
          previousClose: BigInt(148),
          open: BigInt(149),
          high: BigInt(152),
          low: BigInt(147),
          volume: BigInt(1000000),
          marketCap: BigInt(2500000000000),
          peRatio: 25.5,
          eps: 6.0,
          beta: 1.2,
          yahooPrice: 150.5,
          createdAt: new Date(),
        },
      ];

      mockPrismaService.history_searching.findMany.mockResolvedValue(
        mockRecords,
      );

      const result = await service.loadingHistorySearch();

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].symbol).toBe('AAPL');
      // BigInt should be converted to string
      expect(typeof result.data[0].currentPrice).toBe('string');
    });

    it('should handle database errors', async () => {
      mockPrismaService.history_searching.findMany.mockRejectedValue(
        new Error('DB Error'),
      );

      const result = await service.loadingHistorySearch();

      expect(result.success).toBe(false);
      expect(result.error).toBe('DB Error');
    });

    it('should return empty array when no records found', async () => {
      mockPrismaService.history_searching.findMany.mockResolvedValue([]);

      const result = await service.loadingHistorySearch();

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(0);
    });

    it('should properly serialize BigInt values', async () => {
      const mockRecords = [
        {
          id: '1',
          symbol: 'FPT',
          currentPrice: BigInt(98500),
          previousClose: BigInt(97000),
          open: BigInt(97500),
          high: BigInt(99000),
          low: BigInt(96500),
          volume: BigInt(5000000),
          marketCap: BigInt(100000000000),
          peRatio: 15.2,
          eps: 6500,
          beta: 1.1,
          yahooPrice: 98500,
          createdAt: new Date(),
        },
      ];

      mockPrismaService.history_searching.findMany.mockResolvedValue(
        mockRecords,
      );

      const result = await service.loadingHistorySearch();

      expect(result.success).toBe(true);
      expect(result.data[0].currentPrice).toBe('98500');
      expect(result.data[0].volume).toBe('5000000');
      expect(result.data[0].marketCap).toBe('100000000000');
    });
  });
});
