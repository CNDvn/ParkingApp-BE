import { EntityRepository, Repository } from 'typeorm';
import PriceListDetail from './price-list-detail.entity';

@EntityRepository(PriceListDetail)
export class PriceListDetailRepository extends Repository<PriceListDetail> {}
