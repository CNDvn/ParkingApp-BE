import { VerifyOTPDto, VerifyBase } from './dto/verifyOTPDto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/loginAuthDto';
import { Payload } from './jwt/payload';
import { jwtConstants } from './constants';
import { CustomerSignUpDto } from '../customer/dto/customer.signup';
import { CustomerService } from '../customer/customer.service';
import { BusinessSignUpDto } from '../business/dto/business-signup.dto';
import { BusinessService } from '../business/business.service';
import User from '../user/user.entity';
import { StatusEnum } from 'src/utils/status.enum';
import { SharedService } from 'src/shared/shared/shared.service';
import { ChangePasswordDto } from './dto/changePasswordDto';
import SmsService from 'src/utils/sms.service';
import * as adminFirebase from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private customerService: CustomerService,
    private businessService: BusinessService,
    private sharedService: SharedService,
    private smsService: SmsService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    role: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('Not Find', HttpStatus.NOT_FOUND);
    }
    const isMatch = await this.sharedService.comparePassword(
      password,
      user.password,
    );
    if (user && isMatch && user.status === StatusEnum.ACTIVE) {
      user.password = undefined;
      if (user.role.name === role) {
        return user;
      }
    }
    throw new HttpException(
      { message: 'Username or password invalid' },
      HttpStatus.BAD_REQUEST,
    );
  }

  login(user: User): LoginAuthDto {
    const payload: Payload = {
      id: user.id,
      username: user.username,
      roles: [user.role.name],
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.accessTokenSecret,
      expiresIn: '3d',
    });
    const refreshToken = this.jwtService.sign(
      { id: payload.id },
      {
        secret: jwtConstants.refreshTokenSecret,
        expiresIn: '60days',
      },
    );
    this.userService.update(user.id, { refreshToken });
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      message: 'Success',
    };
  }

  async verifyOTPSignUp(verifyBase: VerifyBase): Promise<string> {
    const user = await this.userService.findUserByOTP(verifyBase.otp);
    await this.sharedService.verifyOTPSignUp(verifyBase.otp, user);
    await this.userService.update(user.id, {
      status: StatusEnum.ACTIVE,
      phoneNumberConfirmed: true,
    });
    return 'verify otp sign up success';
  }

  async verifyOTP(verifyOTPDto: VerifyOTPDto): Promise<string> {
    const user: User = await this.userService.findByUsername(
      verifyOTPDto.username,
    );
    await this.sharedService.verifyOTP(verifyOTPDto);
    const password = await this.sharedService.generateOtp();
    await this.smsService.sendSms(user.phoneNumber, password.toString());
    const hashPassword = await this.sharedService.hashPassword(
      password.toString(),
    );
    await this.userService.update(user.id, {
      password: hashPassword,
    });
    return 'reset password success';
  }

  async changePassword(
    user: User,
    changePasswordDto: ChangePasswordDto,
  ): Promise<string> {
    const hashPassword = await this.sharedService.hashPassword(
      changePasswordDto.newPassword,
    );
    const isMatch = await this.sharedService.comparePassword(
      changePasswordDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Password is wrong.!');
    }
    await this.userService.update(user.id, {
      password: hashPassword,
    });
    return 'change password success';
  }

  async resetPassword(username: string): Promise<string> {
    const user: User = await this.userService.findByUsername(username);

    if (!user) {
      throw new BadRequestException('Not found username.!');
    }
    const otp = await this.sharedService.generateOtp();
    await this.smsService.sendSms(user.phoneNumber, otp.toString());
    await this.userService.update(user.id, {
      phoneNumberVerifyCode: otp,
      phoneNumberVerifyCodeExpire: new Date(),
    });
    return 'Send OTP SMS success';
  }

  async signUpAuthCustomer(data: CustomerSignUpDto): Promise<string> {
    return await this.customerService.signUpCustomer(data);
  }

  async signUpAuthBusiness(data: BusinessSignUpDto): Promise<string> {
    return await this.businessService.signUpBusiness(data);
  }

  async verifyPhoneNumber(
    phoneNumber: string,
    codeVerify: number,
  ): Promise<string> {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    if (!user)
      throw new HttpException('Phone number not exist', HttpStatus.BAD_REQUEST);

    if (user.phoneNumberVerifyCodeExpire.getTime() < Date.now())
      throw new HttpException('code verify invalid', HttpStatus.BAD_REQUEST);

    if (user.phoneNumberVerifyCode !== codeVerify)
      throw new HttpException('code verify invalid', HttpStatus.BAD_REQUEST);

    await this.userService.update(user.id, {
      phoneNumberVerifyCode: null,
      phoneNumberConfirmed: true,
      status: StatusEnum.ACTIVE,
    });

    return 'verify success';
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    const { id }: { id: string } = await this.jwtService.verify(refreshToken, {
      secret: jwtConstants.refreshTokenSecret,
      ignoreExpiration: false,
    });
    const user: User = (await this.userService.findByIdWithRelations(id, [
      'role',
    ])) as User;

    if (!user || user.refreshToken !== refreshToken)
      throw new HttpException('Token invalid', HttpStatus.BAD_REQUEST);

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
    };
  }

  async verifyFirebaseToken(token: string): Promise<LoginAuthDto> {
    const userFirebase = await adminFirebase.auth().verifyIdToken(token);
    if (!userFirebase)
      throw new HttpException('token invalid', HttpStatus.BAD_REQUEST);
    const user = await this.userService.findByEmailWithRelations(
      userFirebase.email,
      ['role'],
    );
    if (!user)
      throw new HttpException(
        'This email be not signed up yet',
        HttpStatus.FOUND,
      );
    return this.login(user);
  }
}
