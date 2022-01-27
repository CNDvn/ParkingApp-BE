import { EntityRepository, Repository } from 'typeorm';
import Business from './business.entity';
import { BusinessSignUpDto } from './dto/business.signup.dto';

@EntityRepository(Business)
export class BusinessRepository extends Repository<Business> {
  async signUp(data: BusinessSignUpDto): Promise<Business> {
    const business = new Business();
    business.user.firstName = data.firstName;
    business.user.lastName = data.lastName;
    business.user.DOB = data.DOB;
    business.user.status = data.status;
    business.user.username = data.username;
    business.user.password = data.password;
    business.user.phoneNumber = data.phoneNumber;
    business.user.email = data.email;
    business.address = data.address;
    return await this.save(business);
  }
}
