import SmsService from 'src/utils/sms.service';
import { Injectable } from '@nestjs/common';
import Customer from './customer.entity';
import { CustomerSignUpDto } from './dto/customer.signup';
import { CustomerRepository } from './customer.repository';
import { BaseService } from '../base/base.service';
import { RoleService } from '../role/role.service';
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

  async signUpCustomer(data: CustomerSignUpDto): Promise<Customer> {
    data.password = await this.sharedService.hashPassword(data.password);
    data.DOB = this.sharedService.stringToDate(
      data.DOB.toString(),
      'yyyy-mm-dd',
      '-',
    );

    const callback = async (customer: Customer): Promise<number> => {
      const otp = this.sharedService.generateOtp();
      await this.smsService.sendSms(
        customer.user.phoneNumber,
        `Chào mừng bạn đến với Parking App.\nMã OTP của bạn là: ${otp.toString()}`,
      );
      return otp;
    };

    return await this.customerRepository.signUp(data, callback);
  }
}
