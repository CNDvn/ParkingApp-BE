import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

@Injectable()
export default class SmsService {
  private twilioClient: Twilio;
  constructor(private configService: ConfigService) {
    const accountSid: string = configService.get('TWILIO_ACCOUNT_SID');
    const authToken: string = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendSms(phoneNumber: string, msg: string): Promise<MessageInstance> {
    return this.twilioClient.messages.create({
      body: msg,
      from: '+18608314706',
      to: phoneNumber,
    });
  }
}
