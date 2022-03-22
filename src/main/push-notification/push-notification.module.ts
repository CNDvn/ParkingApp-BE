import { forwardRef, Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationController } from './push-notification.controller';
import { UserModule } from '../user/user.module';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [UserModule, forwardRef(() => BookingModule)],
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
