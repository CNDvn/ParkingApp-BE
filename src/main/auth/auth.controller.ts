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

@ApiBearerAuth()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@GetUser() user: User): Promise<LoginAuthDto> {
    return await this.authService.login(user);
  }

  @Public()
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

  @Public()
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
}
