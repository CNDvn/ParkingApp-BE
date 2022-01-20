import { BusinessService } from './../business/business.service';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role/role.enum';
import { LoginAuthDto } from './dto/loginAuthDto';
import { Payload } from './jwt/payload';
import { jwtConstants } from './constants';
import { AdminService } from '../admin/admin.service';
import { CustomerService } from '../customer/customer.service';
import { HashService } from 'src/share/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private jwtService: JwtService,
    private bussinessService: BusinessService,
    private customerService: CustomerService,
    private hashService: HashService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    role: string,
  ): Promise<Payload | undefined> {
    const hashPassword = await this.hashService.hashPassword(password);
    const user = await this.userService.findByUserName(username);
    const isMatch = await this.hashService.checkPassword(
      user.password,
      hashPassword,
    );
    if (user && isMatch) {
      if (role === Role.Admin) {
        const admin = await this.adminService.findById(user.id);
        if (!admin) return null;
        return {
          id: admin.id,
          roles: [Role.Admin],
          username: username,
        };
      }
      if (role === Role.Business) {
        const business = await this.bussinessService.findById(user.id);
        if (!business) return null;
        return {
          id: business.id,
          roles: [Role.Business],
          username: username,
        };
      }
      if (role === Role.Customer) {
        const customer = await this.customerService.findById(user.id);
        if (!customer) return null;
        return {
          id: customer.id,
          roles: [Role.Customer],
          username: username,
        };
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
}
