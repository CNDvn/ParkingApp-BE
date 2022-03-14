import { Injectable } from '@nestjs/common';
import {
  CreatePushNotificationDto,
  DeviceToken,
} from './dto/create-push-notification.dto';
import * as firebaseAdmin from 'firebase-admin';
import User from '../user/user.entity';
import { UserService } from '../user/user.service';
@Injectable()
export class PushNotificationService {
  constructor(private userService: UserService) {}
  async sendNotify(
    createPushNotificationDto: CreatePushNotificationDto,
    user: User,
  ): Promise<string> {
    const { body, title } = createPushNotificationDto;
    const payload = {
      notification: {
        title,
        body,
      },
    };
    Promise.all([
      await firebaseAdmin.messaging().sendToDevice(user.deviceToken, payload),
    ]);
    return 'send notify success';
  }

  async updateDeviceToken(
    deviceToken: DeviceToken,
    user: User,
  ): Promise<string> {
    const { token } = deviceToken;
    if (!user.deviceToken || user.deviceToken !== token) {
      await this.userService.update(user.id, { deviceToken: token });
      return 'Update token device success';
    }
    return 'Nothing Update token device';
  }
}
