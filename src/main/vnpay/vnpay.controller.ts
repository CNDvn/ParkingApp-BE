import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public';
import { VnpayDto } from './vnpay.dto';

@ApiBearerAuth()
@ApiTags('Vnpays')
@Controller('vnpays')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Post()
  @Public()
  payment(@Req() req: Request): string {
    const ip =
      req.header('x-forwarded-for') ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;

    const url = this.vnpayService.payment(
      ip,
      1000000,
      'NCB',
      'mua thu cho biet nay biet kia',
      'other',
      '',
    );
    return url;
  }

  @Get('/return')
  @Public()
  vnpayReturn(@Query() vnpayDto: VnpayDto): any {
    return this.vnpayService.vnpayReturn(vnpayDto);
  }

  @Get('/ipn')
  vnpayIpn(@Query() vnpayDto: VnpayDto): any {
    return this.vnpayService.vnpayIpn(vnpayDto);
  }
}
