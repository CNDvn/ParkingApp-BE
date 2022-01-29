import { EntityRepository, Repository } from 'typeorm';
import User from '../user/user.entity';
import Business from './business.entity';
import { BusinessSignUpDto } from './dto/business.signup.dto';

@EntityRepository(Business)
export class BusinessRepository extends Repository<Business> {
  async signUp(data: BusinessSignUpDto, user: User): Promise<string> {
    await this.createQueryBuilder()
      .insert()
      .into(Business)
      .values({
        user: user,
      })
      .execute();
    return 'Create Successfully';
  }
}
