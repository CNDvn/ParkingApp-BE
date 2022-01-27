import { Status } from 'src/utils/status.enum';
import { EntityRepository, Repository } from 'typeorm';
import User from '../user/user.entity';
import Customer from './customer.entity';
import { CustomerSignUpDto } from './dto/customer.signup';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async signUp(data: CustomerSignUpDto, user: User): Promise<string> {
    console.log('CustomerRepository');
    console.log(data);
    // const customer = new Customer();
    // customer.user.firstName = data.firstName;
    // customer.user.lastName = data.lastName;
    // customer.user.DOB = data.DOB;
    // customer.user.status = data.status;
    // customer.user.username = data.username;
    // customer.user.password = data.password;
    // customer.user.phoneNumber = data.phoneNumber;
    // customer.user.email = data.email;
    // customer.address = data.address;
    // customer.level = data.level;
    // console.log(customer);
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
