import { Injectable } from '@nestjs/common';
import { RoleEnum } from '../auth/role/role.enum';
import { BaseService } from '../base/base.service';
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

  async getMe(user: User): Promise<User> {
    return await this.userRepository.getMeCustomer(user);
  }

  // async getMe(user: User): Promise<User> {
  //   if (user.role.name === RoleEnum.CUSTOMER) {
  //     return await this.getMeCustomer(user);
  //   } else if (user.role.name === RoleEnum.BUSINESS) {
  //     return await this.getMeCustomer(user);
  //   }
  //   return null;
  // }
}
