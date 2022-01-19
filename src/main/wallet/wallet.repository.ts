import { EntityRepository, Repository } from 'typeorm';
import Wallet from './wallet.entity';

@EntityRepository(Wallet)
export class WalletReposition extends Repository<Wallet> {}
