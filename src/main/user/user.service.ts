import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared/shared.service';
import { BaseService } from '../base/base.service';
import Role from '../role/role.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateProfileDto } from './dto/user-update-profile.dto';
import User from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    private readonly userRepository: UsersRepository,
    private sharedService: SharedService,
  ) {
    super(userRepository);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne(
      { username },
      { relations: ['role', 'customer', 'business'] },
    );
  }

  async createUser(userCreateDTO: UserCreateDto, role: Role): Promise<User> {
    return await this.userRepository.createUser(userCreateDTO, role);
  }

  async getMe(user: User): Promise<User> {
    return await this.userRepository.getMeCustomer(user);
  }

  async deleteUser(user: User, id: string): Promise<string> {
    if (user.id === id) {
      throw new HttpException(
        "Crazy!!! You can't delete yourself",
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userRepository.deleteUser(id);
  }

  async updateUser(id: string, data: UserUpdateProfileDto): Promise<string> {
    const hashPassword = await this.sharedService.hashPassword(data.password);
    data.password = hashPassword;
    return await this.userRepository.updateUser(id, data);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.userRepository.findOne({ phoneNumber });
  }

  async findByIdWithRelations(id: string, relations: string[]): Promise<User> {
    return await this.userRepository.findOne({ id }, { relations });
  }

  async findByEmailWithRelations(
    email: string,
    relations: string[],
  ): Promise<User> {
    return await this.userRepository.findOne({ email }, { relations });
  }
}
