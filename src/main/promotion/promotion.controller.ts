import { DeleteResult } from 'typeorm';
import { PromotionDto } from './dto/promotion.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { Public } from '../auth/public';
import Promotion from './promotion.entity';
@ApiTags('Promotion')
@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  @Public()
  async createPromotion(
    @Body() createPromotion: PromotionDto,
  ): Promise<Promotion> {
    return await this.promotionService.createData(createPromotion);
  }

  @Get()
  @Public()
  async getAllPromotion(): Promise<Promotion[]> {
    return await this.promotionService.getAll();
  }

  @Put('/:id')
  @Public()
  async updatePromotionById(
    @Param('id') id: string,
    @Body() updatePromotion: PromotionDto,
  ): Promise<Promotion> {
    return await this.promotionService.update(id, updatePromotion);
  }

  @Delete('/:id')
  @Public()
  async deletePromotionById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.promotionService.deleteById(id);
  }
}
