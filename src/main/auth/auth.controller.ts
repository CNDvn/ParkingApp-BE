import { ChangePasswordDto } from './dto/changePasswordDto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { BusinessSignUpDto } from '../business/dto/business-signup.dto';
import { CustomerSignUpDto } from '../customer/dto/customer.signup';
import User from '../user/user.entity';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/loginAuthDto';
import { LoginDto } from './dto/loginDto';
import { ResetPasswordDto } from './dto/resetPasswordDto';
import { LocalAuthGuard } from './local-auth/local-auth.guard';
import { Public } from './public';
import { VerifyPhoneNumberDto } from './dto/verifyPhoneNumber.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { VerifyOTPDto } from './dto/verifyOTPDto';

@ApiBearerAuth()
@Public()
@Controller('auths')
@ApiTags('Auths')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@GetUser() user: User): Promise<LoginAuthDto> {
    return await this.authService.login(user);
  }

  @ApiOkResponse({ status: 200, description: 'Change password success' })
  @Post('/changePassword')
  @ApiBody({ type: ChangePasswordDto })
  async changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<string> {
    return await this.authService.changePassword(user, changePasswordDto);
  }

  @ApiOkResponse({ status: 201, description: 'Send OTP SMS success' })
  @Post('/sendOTPSMS')
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<string> {
    return await this.authService.resetPassword(resetPasswordDto.username);
  }

  @Post('/resetPassword')
  @ApiBody({ type: VerifyOTPDto })
  async verifyOTP(@Body() verifyOTPDto: VerifyOTPDto): Promise<string> {
    return await this.authService.verifyOTP(verifyOTPDto);
  }

  @Post('/signUpCustomer')
  @ApiResponse({
    status: 201,
    description: 'SignUp Customer Successfully',
    type: CustomerSignUpDto,
  })
  async signUpCustomer(
    @Body() customerSignUpDto: CustomerSignUpDto,
  ): Promise<string> {
    return await this.authService.signUpAuthCustomer(customerSignUpDto);
  }
  @Post('/signUpBusiness')
  @ApiResponse({
    status: 201,
    description: 'SignUp Business Successfully',
    type: BusinessSignUpDto,
  })
  async signUpBusiness(
    @Body() businessSignUpDto: BusinessSignUpDto,
  ): Promise<string> {
    return await this.authService.signUpAuthBusiness(businessSignUpDto);
  }
  @Post('/verifyPhoneNumber')
  async verifyPhoneNumber(
    @Body() verifyDto: VerifyPhoneNumberDto,
  ): Promise<string> {
    return await this.authService.verifyPhoneNumber(
      verifyDto.phoneNumber,
      verifyDto.verifyCode,
    );
  }

  @Post('/refreshToken')
  async refreshToken(
    @Body() refreshToken: RefreshTokenDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.refreshToken(refreshToken.token);
  }
}
