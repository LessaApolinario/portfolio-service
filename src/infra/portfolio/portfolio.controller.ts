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

@Controller('/users/:user_id/portfolio')
export class PortfolioController {
  constructor(private portfolioUseCase: PortfolioUseCase) {}

  @Get()
  @HttpCode(200)
  async findAllPortfoliosByUserId(@Param('user_id') userId: string) {
    return await this.portfolioUseCase.findByUserId(userId);
  }

  @Get(':symbol')
  @HttpCode(200)
  async findByUserIdAndSymbol(
    @Param('user_id') userId: string,
    @Param('symbol') symbol: string,
  ) {
    return await this.portfolioUseCase.findByUserIdAndSymbol(userId, symbol);
  }

  @Post()
  @HttpCode(201)
  async createPortfolio(
    @Param('user_id') userId: string,
    @Body() data: CreatePortfolioRequest,
  ) {
    return await this.portfolioUseCase.create({
      ...data,
      user_id: userId,
    });
  }

  @Patch(':id')
  @HttpCode(200)
  async updateAmount(
    @Param('id') id: string,
    @Body() body: { amount: number },
  ) {
    return await this.portfolioUseCase.updateAmount(id, body.amount);
  }

  @Delete(':symbol')
  @HttpCode(200)
  async deleteByUserIdAndSymbol(
    @Param('user_id') userId: string,
    @Param('symbol') symbol: string,
  ) {
    return await this.portfolioUseCase.deleteByUserIdAndSymbol(userId, symbol);
  }
}
