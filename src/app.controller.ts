import { Public } from './main/auth/public';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from './decorator/getUser.decorator';
import User from './main/user/user.entity';
import SmsService from './utils/sms.service';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

@Controller('/app')
@ApiBearerAuth()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private smsService: SmsService,
  ) {}

  @Get('/testDocker')
  @Public()
  testDocker(): string {
    return 'This is docker commit maybe done';
  }

  @Get()
  async getHello(@GetUser() user: User): Promise<MessageInstance> {
    return await this.smsService.sendSms(user.phoneNumber, 'xin chao');
  }
}
