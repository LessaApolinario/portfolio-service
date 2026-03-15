import { Module } from '@nestjs/common';
import { PortfolioAdapter } from 'src/core/interfaces/adapters/PortfolioAdapter';
import { PrismaService } from './prisma/prisma.service';
import { PrismaPortfolioRepository } from './prisma/PrismaPortfolioRepository';

@Module({
  providers: [
    PrismaService,
    PrismaPortfolioRepository,
    {
      provide: PortfolioAdapter,
      useClass: PrismaPortfolioRepository,
    },
  ],
  exports: [PrismaService, PortfolioAdapter, PrismaPortfolioRepository],
})
export class DatabaseModule {}
