import { CashTransferCreateDto } from './dto/cash-transfer-create.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
} from '@nestjs/common';
import { CashTransferService } from './cash-transfer.service';
import { GetUser } from 'src/decorator/getUser.decorator';
import User from '../user/user.entity';
import { Request } from 'express';
import { Public } from '../auth/public';
import { VnpayDto } from '../vnpay/vnpay.dto';

@Controller('cashTransfers')
@ApiTags('CashTransfers')
@ApiBearerAuth()
export class CashTransferController {
  constructor(private readonly cashTransferService: CashTransferService) {}

  @Post('/transfer')
  async transferIntoWallet(
    @Req() req: Request,
    @GetUser() user: User,
    @Body() cashTransferDto: CashTransferCreateDto,
  ): Promise<string> {
    const ip =
      req.header('x-forwarded-for') ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;
    return await this.cashTransferService.transferIntoWallet(
      user,
      cashTransferDto,
      ip,
    );
  }

  @Get('/return')
  @Public()
  @Render('index')
  async vnpayReturn(
    @Query() vnpayDto: VnpayDto,
  ): Promise<{ message: string; code: string }> {
    try {
      const result = await this.cashTransferService.transferReturn(vnpayDto);
      return result;
    } catch (error) {
      return error;
    }
  }
}
