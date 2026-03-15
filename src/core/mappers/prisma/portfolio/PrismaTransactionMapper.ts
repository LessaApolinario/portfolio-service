import {
  Transaction as PrismaTransaction,
  TransactionType as PrismaTransactionType,
} from '@prisma/client';
import { Transaction } from 'src/core/domain/models/Transaction';

export class PrismaTransactionMapper {
  static toModel(transaction: PrismaTransaction): Transaction {
    return {
      id: transaction.id,
      user_id: transaction.userId,
      coin_symbol: transaction.coinSymbol,
      type: PrismaTransactionType[String(transaction.type)],
      amount: transaction.amount.toNumber(),
      price: transaction.price.toNumber(),
      created_at: transaction.createdAt.toDateString(),
      updated_at: transaction.updatedAt.toDateString(),
    };
  }
}
