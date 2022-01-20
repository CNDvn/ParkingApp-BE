import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import User from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UsersRepository) {
    super(userRepository);
  }
  async findByUserName(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ username });
  }
}
