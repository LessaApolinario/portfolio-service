import { Injectable } from '@nestjs/common';
import { CreatePortfolioRequest } from 'src/core/@types/http/request/CreatePortfolioRequest';
import { Portfolio } from 'src/core/domain/models/Portfolio';
import { PortfolioAdapter } from 'src/core/interfaces/adapters/PortfolioAdapter';
import { PrismaPortfolioMapper } from 'src/core/mappers/prisma/portfolio/PrismaPortfolioMapper';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaPortfolioRepository extends PortfolioAdapter {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async findByUserId(userId: string): Promise<Portfolio[]> {
    const portfolios = await this.prismaService.portfolio.findMany({
      where: { userId },
    });
    return portfolios.map(PrismaPortfolioMapper.toModel);
  }

  async findByUserIdAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<Portfolio | null> {
    const portfolio = await this.prismaService.portfolio.findFirst({
      where: { userId, coinSymbol: symbol },
    });
    return portfolio ? PrismaPortfolioMapper.toModel(portfolio) : null;
  }

  async create(data: CreatePortfolioRequest): Promise<Portfolio> {
    const newPortfolio = await this.prismaService.portfolio.create({
      data: {
        userId: data.user_id,
        coinSymbol: data.coin_symbol,
        amount: data.amount,
      },
    });

    return PrismaPortfolioMapper.toModel(newPortfolio);
  }

  async updateAmount(id: string, amount: number): Promise<Portfolio> {
    const updatedPortfolio = await this.prismaService.portfolio.update({
      where: { id },
      data: { amount },
    });

    return PrismaPortfolioMapper.toModel(updatedPortfolio);
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.portfolio.delete({
      where: { id },
    });
  }
}
