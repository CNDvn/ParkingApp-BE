import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import User from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UsersRepository) {
    super(userRepository);
  }
  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ username });
  }
}
