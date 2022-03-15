import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePushNotificationDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'title' })
  public title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'body' })
  public body: string;
}

export class DeviceToken {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'token' })
  public token: string;
}
