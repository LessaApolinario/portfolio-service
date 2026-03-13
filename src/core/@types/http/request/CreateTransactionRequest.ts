import { TransactionType } from 'src/core/enums/TransactionType';

export interface CreateTransactionRequest {
  user_id: string;
  coin_symbol: string;
  type: TransactionType;
  amount: number;
  price: number;
}
