import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { Public } from '../auth/public';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import User from '../user/user.entity';
import { ParkingCreateDTO } from './dto/parking-create.dto';
import ParkingDetailDTO from './parking.detail.dto';
import ParkingDTO from './parking.dto';
import Parking from './parking.entity';
import { ParkingService } from './parking.service';
@ApiBearerAuth()
@ApiTags('Parking')
@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create Parking Success',
  })
  async createParking(
    @GetUser() user: User,
    @Body() parkingCreateDTO: ParkingCreateDTO,
  ): Promise<string> {
    return await this.parkingService.createParking(user, parkingCreateDTO);
  }

  @Public()
  @Get()
  @UseInterceptors(MapInterceptor(ParkingDTO, Parking, { isArray: true }))
  @ApiResponse({
    status: 201,
    description: 'Get All Parking Success',
  })
  async getAllParking(): Promise<Parking[]> {
    return await this.parkingService.getAllParking();
  }

  @Public()
  @Get('/:id')
  @UseInterceptors(MapInterceptor(ParkingDetailDTO, Parking))
  @ApiResponse({
    status: 201,
    description: 'Get Detail Parking Success',
  })
  async getParking(@Param('id') id: string): Promise<Parking> {
    return await this.parkingService.getParking(id);
  }

  @Roles(RoleEnum.BUSINESS)
  @Get('OwnerParking')
  @UseInterceptors(MapInterceptor(ParkingDTO, Parking, { isArray: true }))
  @ApiResponse({
    status: 201,
    description: 'Get All Owner Parking Success',
  })
  async getAllOwnerParking(@GetUser() user: User): Promise<Parking[]> {
    return await this.parkingService.getAllOwnerParking(user);
  }
}
