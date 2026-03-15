import { Injectable } from '@nestjs/common';
import { CreatePortfolioRequest } from 'src/core/@types/http/request/CreatePortfolioRequest';
import { Portfolio } from 'src/core/domain/models/Portfolio';
import { PortfolioAdapter } from 'src/core/interfaces/adapters/PortfolioAdapter';
import { PortfolioUseCase } from 'src/core/interfaces/usecases/PortfolioUseCase';

@Injectable()
export class PortfolioService extends PortfolioUseCase {
  constructor(private portfolioAdapter: PortfolioAdapter) {
    super();
  }

  findByUserId(userId: string): Promise<Portfolio[]> {
    return this.portfolioAdapter.findByUserId(userId);
  }

  findByUserIdAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<Portfolio | null> {
    return this.portfolioAdapter.findByUserIdAndSymbol(userId, symbol);
  }

  create(data: CreatePortfolioRequest): Promise<Portfolio> {
    return this.portfolioAdapter.create(data);
  }

  updateAmount(id: string, amount: number): Promise<Portfolio> {
    return this.portfolioAdapter.updateAmount(id, amount);
  }

  deleteByUserIdAndSymbol(userId: string, symbol: string): Promise<void> {
    return this.portfolioAdapter.deleteByUserIdAndSymbol(userId, symbol);
  }
}
