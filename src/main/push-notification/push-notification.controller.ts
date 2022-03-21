import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import User from '../user/user.entity';
import {
  CreatePushNotificationDto,
  DeviceToken,
} from './dto/create-push-notification.dto';
import { PushNotificationService } from './push-notification.service';
@ApiBearerAuth()
@ApiTags('Push-Notifications')
@Controller('push-notification')
export class PushNotificationController {
  constructor(private pushNotificationService: PushNotificationService) {}
  @Post('/testNotify')
  async send(
    @Body() createPushNotificationDto: CreatePushNotificationDto,
    @GetUser() user: User,
  ): Promise<string> {
    return await this.pushNotificationService.sendNotify(
      createPushNotificationDto,
      user,
    );
  }

  @Roles(RoleEnum.CUSTOMER, RoleEnum.BUSINESS)
  @Put('/deviceToken')
  async sendDeviceToken(
    @Body() deviceToken: DeviceToken,
    @GetUser() user: User,
  ): Promise<string> {
    return await this.pushNotificationService.updateDeviceToken(
      deviceToken,
      user,
    );
  }
}
