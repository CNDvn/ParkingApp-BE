import SmsService from 'src/utils/sms.service';
import { Injectable } from '@nestjs/common';
import Business from './business.entity';
import { BusinessRepository } from './business.repository';
import { BusinessSignUpDto } from './dto/business-signup.dto';
import { BaseService } from '../base/base.service';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { SharedService } from 'src/shared/shared/shared.service';

@Injectable()
export class BusinessService extends BaseService<Business> {
  constructor(
    private businessRepository: BusinessRepository,
    private roleService: RoleService,
    private userService: UserService,
    private sharedService: SharedService,
    private smsService: SmsService,
  ) {
    super(businessRepository);
  }

  async signUpBusiness(data: BusinessSignUpDto): Promise<Business> {
    data.password = await this.sharedService.hashPassword(data.password);

    const callback = async (business: Business): Promise<number> => {
      const otp = this.sharedService.generateOtp();
      await this.smsService.sendSms(
        business.user.phoneNumber,
        `Chào mừng bạn đến với Parking App.\nMã OTP của bạn là: ${otp.toString()}`,
      );
      return otp;
    };

    return await this.businessRepository.signUp(data, callback);
  }
}
