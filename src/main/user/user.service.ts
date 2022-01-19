import { Injectable } from '@nestjs/common';
import User from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}
  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ username });
  }
}
