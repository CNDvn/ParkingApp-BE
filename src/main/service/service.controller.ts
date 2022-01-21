import { DeleteResult } from 'typeorm';
import { ServiceDto } from './dto/service.dto';
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
import { ServiceService } from './service.service';
import { Public } from '../auth/public';
import Service from './service.entity';
@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @Public()
  async createService(@Body() createService: ServiceDto): Promise<Service> {
    return await this.serviceService.createData(createService);
  }

  @Get()
  @Public()
  async getAllService(): Promise<Service[]> {
    return await this.serviceService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateServiceById(
    @Param('id') id: string,
    @Body() updateService: ServiceDto,
  ): Promise<Service> {
    return await this.serviceService.update(id, updateService);
  }

  @Delete('/:id')
  @Public()
  async deleteServiceById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.serviceService.deleteById(id);
  }
}
