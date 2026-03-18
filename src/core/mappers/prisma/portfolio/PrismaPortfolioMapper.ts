import { Portfolio as PrismaPortfolio } from '@prisma/client';
import { Portfolio } from 'src/core/domain/models/Portfolio';

export class PrismaPortfolioMapper {
  static toModel(portfolio: PrismaPortfolio): Portfolio {
    return {
      id: portfolio.id,
      user_id: portfolio.userId,
      coin_symbol: portfolio.coinSymbol,
      amount: portfolio.amount.toNumber(),
      created_at: portfolio.createdAt.toLocaleString(),
      updated_at: portfolio.updatedAt.toLocaleString(),
    };
  }
}
