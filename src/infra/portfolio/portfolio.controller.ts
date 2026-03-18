import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { PortfolioUseCase } from 'src/core/interfaces/usecases/PortfolioUseCase';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';

const createPortfolioRequestBodySchema = z.object({
  user_id: z.string(),
  coin_symbol: z.string(),
  amount: z.number(),
});

type CreatePortfolioRequestBody = z.infer<
  typeof createPortfolioRequestBodySchema
>;

const updateAmountRequestBodySchema = z.object({
  id: z.string(),
  amount: z.number(),
});

type UpdateAmountRequestBody = z.infer<typeof updateAmountRequestBodySchema>;

@Controller('/portfolio')
export class PortfolioController {
  constructor(private portfolioUseCase: PortfolioUseCase) {}

  @Get('/user/:user_id')
  @HttpCode(200)
  async findAllPortfoliosByUserId(@Param('user_id') userId: string) {
    if (!userId) {
      throw new BadRequestException('user_id is required');
    }

    return await this.portfolioUseCase.findByUserId(userId);
  }

  @Get('/user/:user_id/symbol/:symbol')
  @HttpCode(200)
  async findByUserIdAndSymbol(
    @Param('user_id') userId: string,
    @Param('symbol') symbol: string,
  ) {
    if (!userId) {
      throw new BadRequestException('user_id is required');
    }

    if (!symbol) {
      throw new BadRequestException('symbol is required');
    }

    return await this.portfolioUseCase.findByUserIdAndSymbol(userId, symbol);
  }

  @Post('/create')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPortfolioRequestBodySchema))
  async createPortfolio(@Body() data: CreatePortfolioRequestBody) {
    return await this.portfolioUseCase.create(data);
  }

  @Patch('/update')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(updateAmountRequestBodySchema))
  async updateAmount(@Body() body: UpdateAmountRequestBody) {
    return await this.portfolioUseCase.updateAmount(body.id, body.amount);
  }

  @Delete('/remove/:id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    await this.portfolioUseCase.remove(id);
  }
}
