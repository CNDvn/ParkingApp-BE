import { EntityRepository, Repository } from 'typeorm';
import User from '../user/user.entity';
import PriceList from './price-list.entity';

@EntityRepository(PriceList)
export class PriceListRepository extends Repository<PriceList> {
  async findPriceListByIdParking(
    idParking: string,
    status: string,
  ): Promise<PriceList> {
    return this.createQueryBuilder('priceList')
      .where('priceList.status = :status', { status: status })
      .leftJoinAndSelect('priceList.parking', 'parking')
      .andWhere('parking.id = :id', { id: idParking })
      .getOne();
  }

  async checkPriceList(user: User, idPriceList: string): Promise<PriceList> {
    return this.createQueryBuilder('priceList')
      .where('priceList.id = :id', {
        id: idPriceList,
      })
      .leftJoinAndSelect('priceList.parking', 'parking')
      .leftJoinAndSelect('parking.business', 'business')
      .andWhere('business.id = :idBusiness', { idBusiness: user.business.id })
      .getOne();
  }
}
