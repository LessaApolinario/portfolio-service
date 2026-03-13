import { CreatePortfolioRequest } from 'src/core/@types/http/request/CreatePortfolioRequest';
import { Portfolio } from 'src/core/domain/models/Portfolio';

export abstract class PortfolioUseCase {
  abstract findByUserId(userId: string): Promise<Portfolio[]>;
  abstract findByUserIdAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<Portfolio | null>;
  abstract create(data: CreatePortfolioRequest): Promise<Portfolio>;
  abstract updateAmount(id: string, amount: number): Promise<Portfolio>;
  abstract deleteByUserIdAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<void>;
}
