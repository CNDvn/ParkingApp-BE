import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/loginAuthDto';
import { Payload } from './jwt/payload';
import { jwtConstants } from './constants';
import { CustomerSignUpDto } from '../customer/dto/customer.signup';
import { CustomerService } from '../customer/customer.service';
import { BusinessSignUpDto } from '../business/dto/business.signup.dto';
import Business from '../business/business.entity';
import { BusinessService } from '../business/business.service';
import User from '../user/user.entity';
import { Status } from 'src/utils/status.enum';
import { SharedService } from 'src/shared/shared/shared.service';
import { Role } from './role/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private customerService: CustomerService,
    private businessService: BusinessService,
    private sharedService: SharedService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    role: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findByUsername(username);
    const isMatch = await this.sharedService.comparePassword(
      password,
      user.password,
    );
    if (user && isMatch && user.status === Status.ACTIVE) {
      user.password = undefined;
      if (user.role.name === role) {
        return user;
      }
    }
    throw new HttpException(
      'Username or password invalid',
      HttpStatus.BAD_REQUEST,
    );
  }

  login(user: User): LoginAuthDto {
    const payload: Payload = {
      id: user.id,
      username: user.username,
      roles: [user.role.name],
    };
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

  async signUpAuthCustomer(data: CustomerSignUpDto): Promise<string> {
    return await this.customerService.signUpCustomer(data);
  }

  async signUpAuthBusiness(data: BusinessSignUpDto): Promise<Business> {
    return await this.businessService.signUpBusiness(data);
  }

  async getMe(user: User): Promise<User> {
    if (user.role.name === Role.CUSTOMER) {
      return await this.userService.getMeCustomer(user);
    }
    return null;
  }
}
