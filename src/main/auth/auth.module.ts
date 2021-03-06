import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-auth/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CustomerModule } from '../customer/customer.module';
import { BusinessModule } from '../business/business.module';
import { SharedModule } from 'src/shared/shared/shared.module';
import SmsService from 'src/utils/sms.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.accessTokenSecret,
      signOptions: { expiresIn: '3d' },
    }),
    CustomerModule,
    BusinessModule,
    SharedModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, SmsService],
  controllers: [AuthController],
})
export class AuthModule {}
