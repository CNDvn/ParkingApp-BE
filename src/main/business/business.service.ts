import SmsService from 'src/utils/sms.service';
import { Injectable } from '@nestjs/common';
import Business from './business.entity';
import { BusinessRepository } from './business.repository';
import { BusinessSignUpDto } from './dto/business-signup.dto';
import { BaseService } from '../base/base.service';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { SharedService } from 'src/shared/shared/shared.service';
import { RoleEnum } from '../auth/role/role.enum';

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

  async signUpBusiness(data: BusinessSignUpDto): Promise<string> {
    const roleBusiness = await this.roleService.findByNameRole(
      RoleEnum.BUSINESS,
    );
    const hashPassword = await this.sharedService.hashPassword(data.password);
    const user = await this.userService.createUser(
      {
        DOB: data.DOB,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashPassword,
        phoneNumber: data.phoneNumber,
        username: data.username,
        address: data.address,
        avatar: data.avatar,
      },
      roleBusiness,
    );
    const otp = await this.sharedService.generateOtp();
    await this.smsService.sendSms(user.phoneNumber, otp.toString());
    await this.userService.update(user.id, {
      phoneNumberVerifyCode: otp,
      phoneNumberVerifyCodeExpire: new Date(),
    });
    return await this.businessRepository.signUp(data, user);
  }
  async findByIdUser(id: string): Promise<Business> {
    return await this.businessRepository.getBusinessByUserId(id);
  }
}
