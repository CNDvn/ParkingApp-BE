import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { Public } from '../auth/public';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import User from '../user/user.entity';
import {
  ParkingSlotCreateCustom,
  ParkingSlotCreateExtends,
} from './dto/parking-slot-create.dto';
import ParkingSlotDTO from './parking-slot.dto';
import ParkingSlot from './parking-slot.entity';
import { ParkingSlotService } from './parking-slot.service';
@ApiBearerAuth()
@ApiTags('ParkingSlots')
@Controller('parking-slots')
export class ParkingSlotController {
  constructor(private readonly parkingSlotService: ParkingSlotService) {}

  @Roles(RoleEnum.BUSINESS)
  @Post('/createParkings/:idParking')
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
  @Post('/createParkingCustom/:idParking')
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

  @Public()
  @Get('/getSlot/:idParking')
  @UseInterceptors(
    MapInterceptor(ParkingSlotDTO, ParkingSlot, { isArray: true }),
  )
  async getSlots(
    @Param('idParking') idParking: string,
  ): Promise<ParkingSlot[]> {
    return await this.parkingSlotService.getAllSlotIdParking(idParking);
  }
}
