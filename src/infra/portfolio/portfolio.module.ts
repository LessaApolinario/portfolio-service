import { Module } from '@nestjs/common';
import { PortfolioUseCase } from 'src/core/interfaces/usecases/PortfolioUseCase';
import { DatabaseModule } from '../database/database.module';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    PortfolioService,
    {
      provide: PortfolioUseCase,
      useClass: PortfolioService,
    },
  ],
  controllers: [PortfolioController],
  exports: [PortfolioService, PortfolioUseCase],
})
export class PortfolioModule {}
