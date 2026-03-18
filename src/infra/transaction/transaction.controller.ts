import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { type CreateTransactionRequest } from 'src/core/@types/http/request/CreateTransactionRequest';
import { TransactionUseCase } from 'src/core/interfaces/usecases/TransactionUseCase';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';
import { z } from 'zod';
import { TransactionType } from 'src/core/enums/TransactionType';

const createTransactionRequestBodySchema = z.object({
  user_id: z.string(),
  coin_symbol: z.string(),
  type: z.enum(['BUY', 'SELL']),
  amount: z.number(),
  price: z.number(),
});

type CreateTransactionRequestBody = z.infer<
  typeof createTransactionRequestBodySchema
>;

@Controller('/transactions')
export class TransactionController {
  constructor(private transactionUseCase: TransactionUseCase) {}

  @Post('/create')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(createTransactionRequestBodySchema))
  async createTransaction(@Body() data: CreateTransactionRequestBody) {
    return await this.transactionUseCase.create({
      ...data,
      type: TransactionType[data.type],
    });
  }

  @Get('/:user_id')
  @HttpCode(200)
  async findTransactionsByUserId(@Param('user_id') userId: string) {
    if (!userId) {
      throw new BadRequestException('user_id is required');
    }

    return await this.transactionUseCase.findByUserId(userId);
  }

  @Get('/user/:user_id/symbol/:symbol')
  @HttpCode(200)
  async findTransactionsByUserIdAndSymbol(
    @Param('user_id') userId: string,
    @Param('symbol') symbol: string,
  ) {
    if (!userId) {
      throw new BadRequestException('user_id is required');
    }

    if (!symbol) {
      throw new BadRequestException('symbol is required');
    }

    return await this.transactionUseCase.findByUserIdAndSymbol(userId, symbol);
  }
}
