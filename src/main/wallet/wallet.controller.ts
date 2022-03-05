import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  // Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import User from '../user/user.entity';
// import { WalletCreateDTO } from './dto/create-wallet.dto';
import { WalletUpdateDTO } from './dto/update-wallet.dto';
import { WalletDTO } from './dto/wallet.dto';
import { WalletEnum } from './dto/wallet.enum';
import Wallet from './wallet.entity';
import { WalletService } from './wallet.service';
@ApiBearerAuth()
@Controller('wallets')
@ApiTags('Wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // @Post()
  // async createWallet(
  //   @GetUser() user: User,
  //   @Body() walletCreateDTO: WalletCreateDTO,
  // ): Promise<Wallet> {
  //   return await this.walletService.createWallet(user, walletCreateDTO);
  // }

  @Get('/me')
  @UseInterceptors(MapInterceptor(WalletDTO, Wallet))
  async getWalletMe(@GetUser() user: User): Promise<Wallet> {
    return await this.walletService.getWalletMe(user.id);
  }

  @Roles(RoleEnum.ADMIN)
  @Get()
  @UseInterceptors(MapInterceptor(WalletDTO, Wallet, { isArray: true }))
  async getAllWallet(): Promise<Wallet[]> {
    return await this.walletService.getAllWallet();
  }

  @Roles(RoleEnum.ADMIN)
  @Get('/:id')
  @UseInterceptors(MapInterceptor(WalletDTO, Wallet))
  async getWalletById(@Param('id') id: string): Promise<Wallet> {
    return await this.walletService.getWalletById(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Put('/:id')
  @ApiQuery({ name: 'flag', enum: WalletEnum })
  async updateBalance(
    @Param('id') id: string,
    @Body() walletUpdateDTO: WalletUpdateDTO,
    @Query('flag') flag: WalletEnum = WalletEnum.Increase,
  ): Promise<string> {
    return await this.walletService.updateBalance(
      id,
      walletUpdateDTO,
      flag === WalletEnum.Increase ? true : false,
    );
  }
}
