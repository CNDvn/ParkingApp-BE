import SmsService from 'src/utils/sms.service';
import { Injectable } from '@nestjs/common';
import Customer from './customer.entity';
import { CustomerSignUpDto } from './dto/customer.signup';
import { CustomerRepository } from './customer.repository';
import { BaseService } from '../base/base.service';
import { RoleService } from '../role/role.service';
import { RoleEnum } from '../auth/role/role.enum';
import { UserService } from '../user/user.service';
import { SharedService } from 'src/shared/shared/shared.service';
@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    private customerRepository: CustomerRepository,
    private roleService: RoleService,
    private userService: UserService,
    private sharedService: SharedService,
    private smsService: SmsService,
  ) {
    super(customerRepository);
  }

  async signUpCustomer(data: CustomerSignUpDto): Promise<string> {
    const roleCustomer = await this.roleService.findByNameRole(
      RoleEnum.CUSTOMER,
    );
    const hashPassword = await this.sharedService.hashPassword(data.password);
    const convertDOB = this.sharedService.stringToDate(
      data.DOB.toString(),
      'yyyy-mm-dd',
      '-',
    );
    const user = await this.userService.createUser(
      {
        DOB: convertDOB,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashPassword,
        phoneNumber: data.phoneNumber,
        username: data.username,
        address: data.address,
        avatar: data.avatar,
      },
      roleCustomer,
    );
    const otp = await this.sharedService.generateOtp();
    await this.smsService.sendSms(user.phoneNumber, otp.toString());
    await this.userService.update(user.id, {
      phoneNumberVerifyCode: otp,
      phoneNumberVerifyCodeExpire: new Date(),
    });
    return await this.customerRepository.signUp(data, user);
  }
}
