import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import User from '../user/user.entity';
import { WalletCreateDTO } from './dto/create-wallet.dto';
import { WalletUpdateDTO } from './dto/update-wallet.dto';
import Wallet from './wallet.entity';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService extends BaseService<Wallet> {
  constructor(private walletRepository: WalletRepository) {
    super(walletRepository);
  }

  async createWallet(
    user: User,
    walletCreateDTO: WalletCreateDTO,
  ): Promise<Wallet> {
    const isExistWallet = await this.walletRepository.findWalletByIdUser(
      user.id,
    );
    if (isExistWallet) {
      throw new BadRequestException('Sorry Wallet Is Exist');
    }
    const { currentBalance } = walletCreateDTO;
    const wallet = new Wallet();
    wallet.user = user;
    wallet.currentBalance = currentBalance;
    wallet.expiredTime = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1),
    );
    return await this.createData(wallet);
  }
  async getAllWallet(): Promise<Wallet[]> {
    return await this.walletRepository.find({
      relations: ['user', 'user.role'],
    });
  }

  async getWalletById(id: string): Promise<Wallet> {
    return await this.walletRepository.findOne({
      relations: ['user', 'user.role'],
      where: { id },
    });
  }

  async getWalletMe(idUser: string): Promise<Wallet> {
    return await this.walletRepository.findWalletByIdUser(idUser);
  }

  async updateBalance(
    id: string,
    walletUpdateDTO: WalletUpdateDTO,
    flag: boolean,
  ): Promise<string> {
    const wallet = await this.getWalletById(id);
    wallet.currentBalance = flag
      ? +wallet.currentBalance + walletUpdateDTO.amountMoney
      : +wallet.currentBalance - walletUpdateDTO.amountMoney;
    await this.walletRepository.save(wallet);
    return flag
      ? `Update Increase Balance ${walletUpdateDTO.amountMoney} Successfully`
      : `Update Decrease Balance ${walletUpdateDTO.amountMoney} Successfully`;
  }
}
