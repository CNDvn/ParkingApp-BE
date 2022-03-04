import { EntityRepository, Repository } from 'typeorm';
import Wallet from './wallet.entity';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  async findWalletByIdUser(idUser: string): Promise<Wallet> {
    return await this.createQueryBuilder('wallet')
      .leftJoinAndSelect('wallet.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id: idUser })
      .getOne();
  }
}
