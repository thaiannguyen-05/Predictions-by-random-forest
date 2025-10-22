import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "prisma/generated/prisma";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy{

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
      omit: { user: { hashedPassword: true } },
    })
  }

  async onModuleInit(){
    const maxRetries = Number(process.env.PRISMA_INIT_RETRIES ?? 5);
    const delayMs = Number(process.env.PRISMA_INIT_DELAY_MS ?? 2000);

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        await this.$connect();
        return;
      } catch (error) {
        if (attempt === maxRetries) {
          console.error(`Prisma initialization failed after ${maxRetries} retries. Continuing without DB connection.`, error);
          return; // Do not crash the app; routes that require DB will fail on demand.
        }
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }
  async onModuleDestroy(){
    await this.$disconnect()
  }
}