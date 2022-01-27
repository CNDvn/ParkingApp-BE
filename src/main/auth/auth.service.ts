import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role/role.enum';
import { LoginAuthDto } from './dto/loginAuthDto';
import { Payload } from './jwt/payload';
import { jwtConstants } from './constants';
import Customer from '../customer/customer.entity';
import { CustomerSignUpDto } from '../customer/dto/customer.signup';
import { CustomerService } from '../customer/customer.service';
import { BusinessSignUpDto } from '../business/dto/business.signup.dto';
import Business from '../business/business.entity';
import { BusinessService } from '../business/business.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private customerService: CustomerService,
    private businessService: BusinessService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    role: string,
  ): Promise<Payload | undefined> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      user.password = undefined;
      if (role === Role.Admin) {
      }
      if (role === Role.Business) {
      }
      if (role === Role.Customer) {
      }
    }
    return null;
  }

  login(payload: Payload): LoginAuthDto {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.accessTokenSecret,
        expiresIn: '3d',
      }),
      refresh_token: this.jwtService.sign(
        { id: payload.id },
        {
          secret: jwtConstants.refreshTokenSecret,
          expiresIn: '365d',
        },
      ),
      message: 'Success',
    };
  }

  async signUpAuthCustomer(data: CustomerSignUpDto): Promise<Customer> {
    return await this.customerService.signUpCustomer(data);
  }

  async signUpAuthBusiness(data: BusinessSignUpDto): Promise<Business> {
    return await this.businessService.signUpBusiness(data);
  }
}
