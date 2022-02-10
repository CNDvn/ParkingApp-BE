import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import User from '../user/user.entity';
import {
  ParkingSlotCreate,
  ParkingSlotCreateExtends,
} from './dto/parking-slot-create.dto';
import { ParkingSlotService } from './parking-slot.service';
@ApiBearerAuth()
@Roles(RoleEnum.BUSINESS)
@ApiTags('ParkingSlot')
@Controller('parking-slots')
export class ParkingSlotController {
  constructor(private readonly parkingSlotService: ParkingSlotService) {}

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

  @Post('/createParkingCustom/:idParking')
  async createParkingSlot(
    @Param('idParking') idParking: string,
    @GetUser() user: User,
    @Body() parkingSlotCreate: ParkingSlotCreate,
  ): Promise<string> {
    return await this.parkingSlotService.createParkingSlot(
      user.business,
      parkingSlotCreate,
      idParking,
    );
  }
}
