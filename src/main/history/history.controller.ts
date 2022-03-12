import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import Booking from '../booking/booking.entity';
import User from '../user/user.entity';
import { HistoryService } from './history.service';
@ApiBearerAuth()
@ApiTags('Historys')
@Controller('historys')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Roles(RoleEnum.CUSTOMER)
  @Get('/me/car/:idCar')
  async getHistoryMe(
    @GetUser() user: User,
    @Param('idCar') idCar: string,
  ): Promise<Booking[]> {
    return await this.historyService.getMeHistory(user, idCar);
  }
}
