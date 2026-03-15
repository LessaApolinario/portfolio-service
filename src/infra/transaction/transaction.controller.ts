import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type CreateTransactionRequest } from 'src/core/@types/http/request/CreateTransactionRequest';
import { TransactionUseCase } from 'src/core/interfaces/usecases/TransactionUseCase';

@Controller()
export class TransactionController {
  constructor(private transactionUseCase: TransactionUseCase) {}

  @Post('/users/:userId/transactions')
  async createTransaction(@Body() data: CreateTransactionRequest) {
    return await this.transactionUseCase.create(data);
  }

  @Get('/users/:userId/transactions/:symbol')
  async findTransactionsByUserIdAndSymbol(
    @Param('user_id') userId: string,
    @Param('symbol') symbol: string,
  ) {
    return await this.transactionUseCase.findByUserIdAndSymbol(userId, symbol);
  }

  @Get('/users/:userId/transactions/:symbol')
  async findTransactionsByUserId(@Param('user_id') userId: string) {
    return await this.transactionUseCase.findByUserId(userId);
  }
}
