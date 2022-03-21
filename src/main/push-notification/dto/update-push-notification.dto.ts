import { PartialType } from '@nestjs/mapped-types';
import { CreatePushNotificationDto } from './create-push-notification.dto';

export class UpdatePushNotificationDto extends PartialType(
  CreatePushNotificationDto,
) {}
