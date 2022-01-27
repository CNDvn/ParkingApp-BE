import { Injectable } from '@nestjs/common';
import Customer from './customer.entity';
import { CustomerSignUpDto } from './dto/customer.signup';
import * as bcrypt from 'bcrypt';
import { CustomerRepository } from './customer.repository';
import { BaseService } from '../base/base.service';
import { RoleService } from '../role/role.service';
import { Role } from '../auth/role/role.enum';
import { UserService } from '../user/user.service';
import { Status } from 'src/utils/status.enum';
@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    private customerRepository: CustomerRepository,
    private roleService: RoleService,
    private userService: UserService,
  ) {
    super(customerRepository);
  }
  hello = (): void => {
    // eslint-disable-next-line no-console
    console.log('chao');
  };

  private async hashPassword(password: string, salt: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return await bcrypt.hash(password, salt);
  }

  async signUpCustomer(data: CustomerSignUpDto): Promise<string> {
    console.log('dasda');
    const roleCustomer = await this.roleService.findByNameRole(Role.CUSTOMER);
    console.log('abc');
    const salt: string = await bcrypt.genSalt();
    const hashPassword = await this.hashPassword(data.password, salt);
    const user = await this.userService.createUser(
      {
        DOB: new Date(data.DOB).toISOString().slice(0, 10),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashPassword,
        phoneNumber: data.phoneNumber,
        status: Status.ACTIVE,
        username: data.username,
      },
      roleCustomer,
    );
    return await this.customerRepository.signUp(data, user);
  }
}
