import { Module } from '@nestjs/common';
import { PortfolioAdapter } from 'src/core/interfaces/adapters/PortfolioAdapter';
import { TransactionAdapter } from 'src/core/interfaces/adapters/TransactionAdapter';
import { PrismaService } from './prisma/prisma.service';
import { PrismaPortfolioRepository } from './prisma/PrismaPortfolioRepository';
import { PrismaTransactionRepository } from './prisma/PrismaTransactionRepository';

@Module({
  providers: [
    PrismaService,
    PrismaPortfolioRepository,
    PrismaTransactionRepository,
    {
      provide: PortfolioAdapter,
      useClass: PrismaPortfolioRepository,
    },
    {
      provide: TransactionAdapter,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [
    PrismaService,
    PortfolioAdapter,
    PrismaPortfolioRepository,
    TransactionAdapter,
    PrismaTransactionRepository,
  ],
})
export class DatabaseModule {}
