import { Injectable } from '@nestjs/common';
import { CreateTransactionRequest } from 'src/core/@types/http/request/CreateTransactionRequest';
import { Transaction } from 'src/core/domain/models/Transaction';
import { TransactionAdapter } from 'src/core/interfaces/adapters/TransactionAdapter';
import { TransactionUseCase } from 'src/core/interfaces/usecases/TransactionUseCase';

@Injectable()
export class TransactionService extends TransactionUseCase {
  constructor(private transactionAdapter: TransactionAdapter) {
    super();
  }

  create(data: CreateTransactionRequest): Promise<Transaction> {
    return this.transactionAdapter.create(data);
  }

  findByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionAdapter.findByUserId(userId);
  }

  findByUserIdAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<Transaction[]> {
    return this.transactionAdapter.findByUserIdAndSymbol(userId, symbol);
  }
}
