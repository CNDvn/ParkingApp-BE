import { MapInterceptor } from '@automapper/nestjs';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { Public } from '../auth/public';
import User from '../user/user.entity';
import { ParkingCreateDTO } from './dto/parking-create.dto';
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
    return await this.parkingService.creatParking(user, parkingCreateDTO);
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
}
