import { EntityRepository, Repository } from 'typeorm';
import Business from './business.entity';

@EntityRepository(Business)
export class BusinessRepository extends Repository<Business> {}
