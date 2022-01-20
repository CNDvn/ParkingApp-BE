import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-auth/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AdminModule } from '../admin/admin.module';
import { BusinessModule } from '../business/business.module';
import { ShareModule } from 'src/share/share.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    ShareModule,
    CustomerModule,
    BusinessModule,
    AdminModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.accessTokenSecret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
