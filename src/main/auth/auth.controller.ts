import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { BusinessSignUpDto } from '../business/dto/business-signup.dto';
import { CustomerSignUpDto } from '../customer/dto/customer.signup';
import User from '../user/user.entity';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/loginAuthDto';
import { LoginDto } from './dto/loginDto';
import { LocalAuthGuard } from './local-auth/local-auth.guard';
import { Public } from './public';
import { VerifyPhoneNumberDto } from './dto/verifyPhoneNumber.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@ApiBearerAuth()
@Public()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@GetUser() user: User): Promise<LoginAuthDto> {
    return await this.authService.login(user);
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
