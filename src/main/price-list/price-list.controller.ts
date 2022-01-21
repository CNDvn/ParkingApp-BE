import { DeleteResult } from 'typeorm';
import { PriceListDto } from './dto/price-list.dto';
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
import { PriceListService } from './price-list.service';
import { Public } from '../auth/public';
import PriceList from './price-list.entity';
@ApiTags('Price-list')
@Controller('price-list')
export class PriceListController {
  constructor(private readonly priceListService: PriceListService) {}

  @Post()
  @Public()
  async createPriceList(
    @Body() createPriceList: PriceListDto,
  ): Promise<PriceList> {
    return await this.priceListService.createData(createPriceList);
  }

  @Get()
  @Public()
  async getAllPriceList(): Promise<PriceList[]> {
    return await this.priceListService.getAll();
  }

  @Put('/:id')
  @Public()
  async updatePriceListById(
    @Param('id') id: string,
    @Body() updatePriceList: PriceListDto,
  ): Promise<PriceList> {
    return await this.priceListService.update(id, updatePriceList);
  }

  @Delete('/:id')
  @Public()
  async deletePriceListById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.priceListService.deleteById(id);
  }
}
