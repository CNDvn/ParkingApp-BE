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
        user: user,
        level: 0,
      })
      .execute();
    // const otp = await this.sharedService.generateOtp();
    // await this.smsService.sendSms(user.phoneNumber, otp.toString());
    return 'Create Successfully';
  }
}
