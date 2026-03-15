import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { type CreatePortfolioRequest } from 'src/core/@types/http/request/CreatePortfolioRequest';
import { PortfolioUseCase } from 'src/core/interfaces/usecases/PortfolioUseCase';

@Controller()
export class PortfolioController {
  constructor(private portfolioUseCase: PortfolioUseCase) {}

  @Get('/users/:user_id/portfolio')
  @HttpCode(200)
  async findAllPortfoliosByUserId(@Param('user_id') userId: string) {
    return await this.portfolioUseCase.findByUserId(userId);
  }

  @Get('/users/:user_id/portfolio/:symbol')
  @HttpCode(200)
  async findByUserIdAndSymbol(
    @Param('user_id') userId: string,
    @Param('symbol') symbol: string,
  ) {
    return await this.portfolioUseCase.findByUserIdAndSymbol(userId, symbol);
  }

  @Post('/user/:user_id/portfolio')
  @HttpCode(201)
  async createPortfolio(@Body() data: CreatePortfolioRequest) {
    return await this.portfolioUseCase.create(data);
  }

  @Patch('/user/:user_id/portfolio/:amount')
  @HttpCode(200)
  async updateAmount(
    @Param('user_id') userId: string,
    @Param('amount') amount: number,
  ) {
    return await this.portfolioUseCase.updateAmount(userId, amount);
  }

  @Delete('/user/:user_id/portfolio/:symbol')
  @HttpCode(200)
  async deleteByUserIdAndSymbol(
    @Param('user_id') userId: string,
    @Param('symbol') symbol: string,
  ) {
    return await this.portfolioUseCase.deleteByUserIdAndSymbol(userId, symbol);
  }
}
