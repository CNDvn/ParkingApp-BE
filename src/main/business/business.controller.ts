import { DeleteResult } from 'typeorm';
import { BusinessDto } from './dto/business.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from '../auth/public';
import { BusinessService } from './business.service';
import { ApiTags } from '@nestjs/swagger';
import Business from './business.entity';
@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @Public()
  async createBusiness(@Body() createBusiness: BusinessDto): Promise<Business> {
    return await this.businessService.createData(createBusiness);
  }

  @Get()
  @Public()
  async getAllBusiness(): Promise<Business[]> {
    return await this.businessService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateBusinessById(
    @Param('id') id: string,
    @Body() updateBusiness: BusinessDto,
  ): Promise<Business> {
    return await this.businessService.update(id, updateBusiness);
  }

  @Delete('/:id')
  @Public()
  async deleteBusinessById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.businessService.deleteById(id);
  }
}
