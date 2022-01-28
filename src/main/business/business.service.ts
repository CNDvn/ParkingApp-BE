import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Business from './business.entity';
import * as bcrypt from 'bcrypt';
import { BusinessRepository } from './business.repository';
import { BusinessSignUpDto } from './dto/business.signup.dto';
import { BaseService } from '../base/base.service';
import User from '../user/user.entity';

@Injectable()
export class BusinessService extends BaseService<Business> {
  @InjectRepository(Business)
  private businessRepository: BusinessRepository;

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async signUpBusiness(data: BusinessSignUpDto): Promise<Business> {
    const salt = await bcrypt.genSalt();
    const password = await this.hashPassword(data.password, salt);
    data.status = 'active';
    data.password = password;
    const business: Business = await this.businessRepository.signUp(data);
    return business;
  }
}
