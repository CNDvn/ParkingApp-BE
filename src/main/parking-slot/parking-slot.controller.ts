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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import User from '../user/user.entity';
import {
  ParkingSlotCreateCustom,
  ParkingSlotCreateExtends,
} from './dto/parking-slot-create.dto';
import ParkingSlotDTO from './parking-slot.dto';
import { ParkingSlotService } from './parking-slot.service';
import {
  IPaginateResponse,
  paginateResponse,
} from '../base/filter.pagnigation';
import { ParkingSlotPaginationFilter } from './dto/parking-slot-pagination.filter';

@ApiBearerAuth()
@ApiTags('ParkingSlots')
@Controller('parking-slots')
export class ParkingSlotController {
  constructor(private readonly parkingSlotService: ParkingSlotService) {}

  @Roles(RoleEnum.BUSINESS)
  @Post('/parkings/:idParking')
  async createParkingSlots(
    @Param('idParking') idParking: string,
    @GetUser() user: User,
    @Body() parkingSlotCreate: ParkingSlotCreateExtends,
  ): Promise<string> {
    return await this.parkingSlotService.createParkingSlots(
      user.business,
      parkingSlotCreate,
      idParking,
    );
  }

  @Roles(RoleEnum.BUSINESS)
  @Post('/parkingsCustom/:idParking')
  async createParkingSlot(
    @Param('idParking') idParking: string,
    @GetUser() user: User,
    @Body() parkingSlotCreate: ParkingSlotCreateCustom,
  ): Promise<string> {
    return await this.parkingSlotService.createParkingSlot(
      user.business,
      parkingSlotCreate,
      idParking,
    );
  }

  // @Public()
  // @Get('/:idParking')
  // @UseInterceptors(
  //   MapInterceptor(ParkingSlotDTO, ParkingSlot, { isArray: true }),
  // )
  // async getSlots(
  //   @Param('idParking') idParking: string,
  // ): Promise<ParkingSlot[]> {
  //   return await this.parkingSlotService.getAllSlotIdParking(idParking);
  // }

  @Get('/parking/:id')
  async getSlotPaging(
    @Param('id') id: string,
    @Query() parkingSlotPaginationFilter: ParkingSlotPaginationFilter,
  ): Promise<IPaginateResponse<ParkingSlotDTO> | { message: string }> {
    const [list, count] = await this.parkingSlotService.getAllSlotOfParking(
      id,
      parkingSlotPaginationFilter,
    );
    if (list.length === 0) {
      return { message: 'No Data' };
    }

    return paginateResponse<ParkingSlotDTO>(
      [list, count],
      parkingSlotPaginationFilter.currentPage as number,
      parkingSlotPaginationFilter.sizePage as number,
    );
  }
}
