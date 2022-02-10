import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { Public } from '../auth/public';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import {
  IPaginateResponse,
  paginateResponse,
} from '../base/filter.pagnigation';
import User from '../user/user.entity';
import { ParkingCreateDTO } from './dto/parking-create.dto';
import ParkingFilterPagination from './dto/parking-pagination.filter';
import ParkingDetailDTO from './parking.detail.dto';
import ParkingDTO from './parking.dto';
import Parking from './parking.entity';
import { ParkingService } from './parking.service';
@ApiBearerAuth()
@ApiTags('Parkings')
@Controller('parkings')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Roles(RoleEnum.BUSINESS)
  @Get('OwnerParking')
  @UseInterceptors(MapInterceptor(ParkingDTO, Parking, { isArray: true }))
  @ApiResponse({
    status: 201,
    description: 'Get All Owner Parking Success',
  })
  async getAllOwnerParking(
    @GetUser() user: User,
  ): Promise<Parking[] | { message: string }> {
    const data = await this.parkingService.getAllOwnerParking(user);
    if (data.length === 0) {
      return { message: 'No Data' };
    }
    return data;
  }

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
  // @UseInterceptors(
  //   MapInterceptor(ParkingPagination, Parking, { isArray: true }),
  // )
  @ApiResponse({
    status: 201,
    description: 'Get All Parking Success',
  })
  async getAllParking(
    @Query() parkingFilterPagination: ParkingFilterPagination,
  ): Promise<IPaginateResponse<ParkingDTO> | { message: string }> {
    const [list, count] = await this.parkingService.getAllParking(
      parkingFilterPagination,
    );
    if (list.length === 0) {
      return { message: 'No Data' };
    }
    return paginateResponse<ParkingDTO>(
      [list, count],
      parkingFilterPagination.currentPage as number,
      parkingFilterPagination.sizePage as number,
    );
  }

  @Public()
  @Get('/:id')
  @UseInterceptors(MapInterceptor(ParkingDetailDTO, Parking))
  @ApiResponse({
    status: 201,
    description: 'Get Detail Parking Success',
  })
  async getParking(
    @Param('id') id: string,
  ): Promise<Parking | { message: string }> {
    const data = await this.parkingService.getParking(id);
    if (!data) {
      return { message: 'No Data' };
    }
    return data;
  }
}
