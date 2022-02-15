import User from 'src/main/user/user.entity';
import { UserService } from 'src/main/user/user.service';
import {
  Injectable,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { VerifyOTPDto } from 'src/main/auth/dto/verifyOTPDto';
@Injectable()
export class SharedService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  public async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  public async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  public stringToDate(
    _date: string,
    _format: string,
    _delimiter: string,
  ): Date {
    const formatLowerCase = _format.toLowerCase();
    const formatItems = formatLowerCase.split(_delimiter);
    const dateItems = _date.split(_delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    const month = parseInt(dateItems[monthIndex]) - 1;
    const formateDate = new Date(
      +dateItems[yearIndex],
      month,
      +dateItems[dayIndex],
    );
    return formateDate;
  }

  public generateOtp(): number {
    let code = 0;
    do {
      code = Math.floor(Math.random() * 1000000);
    } while (code < 100000);
    return code;
  }

  public async verifyOTP(verifyOTPDto: VerifyOTPDto): Promise<void> {
    const user: User = await this.userService.findByUsername(
      verifyOTPDto.username,
    );
    if (!user) {
      throw new BadRequestException('Not found username.!');
    }
    this.verifyOTPSignUp(user.phoneNumberVerifyCode, user);
  }
  public verifyOTPSignUp(otp: number, user: User): void {
    const diff = Math.abs(
      Date.now() - user.phoneNumberVerifyCodeExpire.getTime(),
    );
    const minutes = Math.floor(diff / 1000 / 60);
    if (otp === user.phoneNumberVerifyCode && minutes > 5) {
      throw new BadRequestException('OTP time up.!');
    }
    if (otp !== user.phoneNumberVerifyCode && minutes < 5) {
      throw new BadRequestException('OTP is wrong.!');
    }
  }
}
