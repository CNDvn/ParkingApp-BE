import { DeleteResult } from 'typeorm';
import { PriceListDetailDto } from './dto/price-list-detail.dto';
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
import { PriceListDetailService } from './price-list-detail.service';
import { Public } from '../auth/public';
import PriceListDetail from './price-list-detail.entity';
@ApiTags('Price-list-detail')
@Controller('price-list-detail')
export class PriceListDetailController {
  constructor(
    private readonly priceListDetailService: PriceListDetailService,
  ) {}

  @Post()
  @Public()
  async createPriceListDetail(
    @Body() createPriceListDetail: PriceListDetailDto,
  ): Promise<PriceListDetail> {
    return await this.priceListDetailService.createData(createPriceListDetail);
  }

  @Get()
  @Public()
  async getAllPriceListDetail(): Promise<PriceListDetail[]> {
    return await this.priceListDetailService.getAll();
  }

  @Put('/:id')
  @Public()
  async updatePriceListDetailById(
    @Param('id') id: string,
    @Body() updatePriceListDetail: PriceListDetailDto,
  ): Promise<PriceListDetail> {
    return await this.priceListDetailService.update(id, updatePriceListDetail);
  }

  @Delete('/:id')
  @Public()
  async deletePriceListDetailById(
    @Param('id') id: string,
  ): Promise<DeleteResult> {
    return await this.priceListDetailService.deleteById(id);
  }
}
