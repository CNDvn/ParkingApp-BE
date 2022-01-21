import { WalletDto } from './dto/wallet.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Public } from '../auth/public';
import Wallet from './wallet.entity';
import { DeleteResult } from 'typeorm';
@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @Public()
  async createWallet(@Body() createWallet: WalletDto): Promise<Wallet> {
    return await this.walletService.createData(createWallet);
  }

  @Get()
  @Public()
  async getAllWallet(): Promise<Wallet[]> {
    return await this.walletService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateWallet(
    @Param('id') id: string,
    @Body() updateWallet: WalletDto,
  ): Promise<Wallet> {
    return await this.walletService.update(id, updateWallet);
  }

  @Delete('/:id')
  @Public()
  async deleteWallet(@Param('id') id: string): Promise<DeleteResult> {
    return await this.walletService.deleteById(id);
  }
}
