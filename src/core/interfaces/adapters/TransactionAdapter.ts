import { CreateTransactionRequest } from 'src/core/@types/http/request/CreateTransactionRequest';
import { Transaction } from 'src/core/domain/models/Transaction';

export abstract class TransactionAdapter {
  abstract create(data: CreateTransactionRequest): Promise<Transaction>;
  abstract findByUserId(userId: string): Promise<Transaction[]>;
  abstract findByUserIdAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<Transaction[]>;
}
