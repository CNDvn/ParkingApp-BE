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
      code = Math.floor(Math.random() * 10000);
    } while (code < 1000);
    return code;
  }

  public generatePassword(): number {
    let code = 0;
    do {
      code = Math.floor(Math.random() * 100000000);
    } while (code < 10000000);
    return code;
  }

  public async verifyOTP(verifyOTPDto: VerifyOTPDto): Promise<void> {
    const user: User = await this.userService.findByUsername(
      verifyOTPDto.username,
    );
    if (!user) {
      throw new BadRequestException('Not found username.!');
    }
    this.verifyOTPSignUp(verifyOTPDto.otp, user);
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
    if (otp !== user.phoneNumberVerifyCode && minutes > 5) {
      throw new BadRequestException('OTP is wrong and time up.!');
    }
  }

  public calculateTotalAmount(
    amountOneHour: number,
    milliseconds: number,
  ): number {
    const hourBook = milliseconds / 1000 / 60 / 60;
    let total = 0;
    if (hourBook <= 2) {
      total = amountOneHour * 2;
    } else if (hourBook > 2 && hourBook <= 4) {
      total =
        amountOneHour * 2 +
        amountOneHour * (hourBook - 2) +
        amountOneHour * (hourBook - 2) * (5 / 100);
    } else if (hourBook > 4 && hourBook <= 6) {
      total =
        amountOneHour * 2 +
        amountOneHour * 2 +
        amountOneHour * 2 * (5 / 100) +
        amountOneHour * (hourBook - 4) +
        amountOneHour * (hourBook - 4) * (10 / 100);
    } else if (hourBook > 6 && hourBook <= 8) {
      total =
        amountOneHour * 2 +
        amountOneHour * 2 +
        amountOneHour * 2 * (5 / 100) +
        amountOneHour * 4 +
        amountOneHour * 4 * (10 / 100) +
        amountOneHour * (hourBook - 6) +
        amountOneHour * (hourBook - 6) * (15 / 100);
    } else if (hourBook > 8 && hourBook <= 10) {
      total =
        amountOneHour * 2 +
        amountOneHour * 2 +
        amountOneHour * 2 * (5 / 100) +
        amountOneHour * 4 +
        amountOneHour * 4 * (10 / 100) +
        amountOneHour * 6 +
        amountOneHour * 6 * (15 / 100) +
        amountOneHour * (hourBook - 8) +
        amountOneHour * (hourBook - 8) * (20 / 100);
    } else if (hourBook > 10) {
      total =
        amountOneHour * 2 +
        amountOneHour * 2 +
        amountOneHour * 2 * (5 / 100) +
        amountOneHour * 4 +
        amountOneHour * 4 * (10 / 100) +
        amountOneHour * 6 +
        amountOneHour * 6 * (15 / 100) +
        amountOneHour * 8 +
        amountOneHour * 8 * (20 / 100) +
        amountOneHour * (hourBook - 10) +
        amountOneHour * (hourBook - 10) * (20 / 100);
    }
    return total;
  }
}
