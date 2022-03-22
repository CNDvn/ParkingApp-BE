import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  CreatePushNotificationDto,
  DeviceToken,
} from './dto/create-push-notification.dto';
import * as firebaseAdmin from 'firebase-admin';
import User from '../user/user.entity';
import { UserService } from '../user/user.service';
import { BookingService } from '../booking/booking.service';
@Injectable()
export class PushNotificationService {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => BookingService))
    private bookingService: BookingService,
  ) {}
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

  async systemHandlerService(): Promise<void> {
    const listBookingInParking =
      await this.bookingService.getAllBookingInParking();
    for (const item of listBookingInParking) {
      const diff = Math.abs(Date.now() - new Date(item.checkinTime).getTime());
      const minutes = Math.floor(diff / 1000 / 60);
      await this.sendNotify(
        {
          title: ` Hi ${
            item.car.customer.user.firstName + item.car.customer.user.lastName
          }`,
          body: `Your Car ${item.car.nPlates} booked ${minutes} minutes`,
        },
        item.car.customer.user,
      );
    }
    // console.log('send notify 10s');
  }
}
