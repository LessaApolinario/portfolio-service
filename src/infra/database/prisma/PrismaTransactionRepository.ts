import { Injectable } from '@nestjs/common';
import { CreateTransactionRequest } from 'src/core/@types/http/request/CreateTransactionRequest';
import { Transaction } from 'src/core/domain/models/Transaction';
import { TransactionAdapter } from 'src/core/interfaces/adapters/TransactionAdapter';
import { PrismaTransactionMapper } from 'src/core/mappers/prisma/portfolio/PrismaTransactionMapper';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTransactionRepository extends TransactionAdapter {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async create(data: CreateTransactionRequest): Promise<Transaction> {
    const newTransaction = await this.prismaService.transaction.create({
      data: {
        userId: data.user_id,
        amount: data.amount,
        coinSymbol: data.coin_symbol,
        type: data.type,
        price: data.price,
      },
    });

    return PrismaTransactionMapper.toModel(newTransaction);
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await this.prismaService.transaction.findMany({
      where: { userId },
    });

    return transactions.map(PrismaTransactionMapper.toModel);
  }

  async findByUserIdAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<Transaction[]> {
    const transactions = await this.prismaService.transaction.findMany({
      where: { userId, coinSymbol: symbol },
    });

    return transactions.map(PrismaTransactionMapper.toModel);
  }
}
