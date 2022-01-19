import { EntityRepository, Repository } from 'typeorm';
import User from './user.entity';

@EntityRepository(User)
export class UserReposition extends Repository<User> {}
