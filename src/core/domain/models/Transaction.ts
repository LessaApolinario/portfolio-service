import { TransactionType } from 'src/core/enums/TransactionType';

export interface Transaction {
  id: string;
  user_id: string;
  coin_symbol: string;
  type: TransactionType;
  amount: number;
  price: number;
  created_at: string;
  updated_at: string;
}
