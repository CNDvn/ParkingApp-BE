import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Customer from '../customer/customer.entity';
import Role from '../role/role.entity';
import { UserCreateDto } from './dto/user.create.dto';
import User from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UsersRepository) {
    super(userRepository);
  }
  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne(
      { username },
      { relations: ['role'] },
    );
  }

  async createUser(userCreateDTO: UserCreateDto, role: Role): Promise<User> {
    return await this.userRepository.createUser(userCreateDTO, role);
  }

  async getMeCustomer(user: User): Promise<User> {
    return await this.userRepository.getMeCustomer(user);
  }
}
