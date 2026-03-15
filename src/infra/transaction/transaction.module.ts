import { Module } from '@nestjs/common';
import { TransactionUseCase } from 'src/core/interfaces/usecases/TransactionUseCase';
import { DatabaseModule } from '../database/database.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    {
      provide: TransactionUseCase,
      useClass: TransactionService,
    },
  ],
  exports: [TransactionService, TransactionUseCase],
})
export class TransactionModule {}
