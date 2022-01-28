import { Status } from 'src/utils/status.enum';
import { EntityRepository, Repository } from 'typeorm';
import User from '../user/user.entity';
import Customer from './customer.entity';
import { CustomerSignUpDto } from './dto/customer.signup';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async signUp(data: CustomerSignUpDto, user: User): Promise<string> {
    await this.createQueryBuilder()
      .insert()
      .into(Customer)
      .values({
        address: data.address,
        status: Status.ACTIVE,
        user: user,
        level: 0,
      })
      .execute();
    return 'Create Successfully';
  }
}
