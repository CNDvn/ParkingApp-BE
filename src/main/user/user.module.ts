import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user.profile';
import { SharedModule } from 'src/shared/shared/shared.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    SharedModule,
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [UserService],
})
export class UserModule {}
