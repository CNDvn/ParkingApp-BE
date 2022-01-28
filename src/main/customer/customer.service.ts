import { Injectable } from '@nestjs/common';
import Customer from './customer.entity';
import { CustomerSignUpDto } from './dto/customer.signup';
import { CustomerRepository } from './customer.repository';
import { BaseService } from '../base/base.service';
import { RoleService } from '../role/role.service';
import { Role } from '../auth/role/role.enum';
import { UserService } from '../user/user.service';
import { Status } from 'src/utils/status.enum';
import { SharedService } from 'src/shared/shared/shared.service';
@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    private customerRepository: CustomerRepository,
    private roleService: RoleService,
    private userService: UserService,
    private sharedService: SharedService,
  ) {
    super(customerRepository);
  }

  async signUpCustomer(data: CustomerSignUpDto): Promise<string> {
    const roleCustomer = await this.roleService.findByNameRole(Role.CUSTOMER);
    const hashPassword = await this.sharedService.hashPassword(data.password);
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
