import { Injectable } from '@nestjs/common';
import Business from './business.entity';
import { BusinessRepository } from './business.repository';
import { BusinessSignUpDto } from './dto/business.signup.dto';
import { BaseService } from '../base/base.service';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { SharedService } from 'src/shared/shared/shared.service';
import { RoleEnum } from '../auth/role/role.enum';
import { Status } from 'src/utils/status.enum';

@Injectable()
export class BusinessService extends BaseService<Business> {
  constructor(
    private businessRepository: BusinessRepository,
    private roleService: RoleService,
    private userService: UserService,
    private sharedService: SharedService,
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
        status: Status.ACTIVE,
        username: data.username,
        address: data.address,
        avatar: data.avatar,
      },
      roleBusiness,
    );
    return await this.businessRepository.signUp(data, user);
  }
}
