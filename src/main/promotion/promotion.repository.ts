import { EntityRepository, Repository } from 'typeorm';
import Promotion from './promotion.entity';

@EntityRepository(Promotion)
export class PromotionRepository extends Repository<Promotion> {}
