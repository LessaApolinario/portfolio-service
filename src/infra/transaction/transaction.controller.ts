import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type CreateTransactionRequest } from 'src/core/@types/http/request/CreateTransactionRequest';
import { TransactionUseCase } from 'src/core/interfaces/usecases/TransactionUseCase';

@Controller('/users/:user_id/transactions')
export class TransactionController {
  constructor(private transactionUseCase: TransactionUseCase) {}

  @Post()
  async createTransaction(
    @Param('user_id') userId: string,
    @Body() data: CreateTransactionRequest,
  ) {
    return await this.transactionUseCase.create({
      ...data,
      user_id: userId,
    });
  }

  @Get()
  async findTransactionsByUserId(@Param('user_id') userId: string) {
    return await this.transactionUseCase.findByUserId(userId);
  }

  @Get(':symbol')
  async findTransactionsByUserIdAndSymbol(
    @Param('user_id') userId: string,
    @Param('symbol') symbol: string,
  ) {
    return await this.transactionUseCase.findByUserIdAndSymbol(userId, symbol);
  }
}
