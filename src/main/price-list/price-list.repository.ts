import { EntityRepository, Repository } from 'typeorm';
import PriceList from './price-list.entity';

@EntityRepository(PriceList)
export class PriceListRepository extends Repository<PriceList> {}
