import { EntityRepository, Repository } from 'typeorm';
import Customer from './customer.entity';
import { CustomerSignUpDto } from './dto/customer.signup';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async signUp(data: CustomerSignUpDto): Promise<Customer> {
    const customer = new Customer();
    customer.user.firstName = data.firstName;
    customer.user.lastName = data.lastName;
    customer.user.DOB = data.DOB;
    customer.user.status = data.status;
    customer.user.username = data.username;
    customer.user.password = data.password;
    customer.user.phoneNumber = data.phoneNumber;
    customer.user.email = data.email;
    customer.address = data.address;
    customer.level = data.level;
    return await this.save(customer);
  }
}
