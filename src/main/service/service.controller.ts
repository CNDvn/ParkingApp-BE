import { Public } from './../auth/public';
import { UpdateParkingServiceDto } from './dto/service-update.dto';
import { StatusEnum } from 'src/utils/status.enum';
import { GetUser } from 'src/decorator/getUser.decorator';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Roles } from '../auth/role/roles.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import Service from './service.entity';
import ServiceDTO from './service.dto';
import User from '../user/user.entity';
import { ServiceCreateDto } from './dto/service-create.dto';

@Controller('services')
@ApiBearerAuth()
@ApiTags('Services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Roles(RoleEnum.BUSINESS)
  @Post()
  @UseInterceptors(MapInterceptor(ServiceDTO, Service))
  async addService(
    @GetUser() user: User,
    @Body() serviceDto: ServiceCreateDto,
  ): Promise<Service> {
    return await this.serviceService.addParkingService(user, serviceDto);
  }

  @Public()
  @Get('/:parkingId')
  @ApiResponse({
    status: 200,
    description: 'Get List Parking Service',
  })
  @UseInterceptors(MapInterceptor(ServiceDTO, Service, { isArray: true }))
  async getAllParkingServices(
    @Param('parkingId') parkingId: string,
  ): Promise<Service[]> {
    return await this.serviceService.getAllParkingServices(parkingId);
  }

  @Roles(RoleEnum.BUSINESS)
  @Delete('/:id')
  async updateStatusParkingService(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<string> {
    const result = await this.serviceService.updateStatusOwnParkingService(
      id,
      StatusEnum.IN_ACTIVE,
    );
    if (!result) return 'failed';
    return 'success';
  }

  @Roles(RoleEnum.BUSINESS)
  @Put('/:id')
  @UseInterceptors(MapInterceptor(ServiceDTO, Service))
  async updateService(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body()
    serviceDto: UpdateParkingServiceDto,
  ): Promise<Service> {
    return await this.serviceService.updateOwnParkingService(
      user,
      id,
      serviceDto,
    );
  }
}
