import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { SharedService } from 'src/shared/shared/shared.service';
import { BaseMultipleFile } from '../base/base.images.dto';
import { BaseService } from '../base/base.service';
import { ImgbbDto } from '../image/dto/imgbb.dto';
import Role from '../role/role.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateProfileDto } from './dto/user-update-profile.dto';
import User from './user.entity';
import { UsersRepository } from './user.repository';
import { AxiosResponse } from 'axios';
import * as FormData from 'form-data';
@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    private readonly userRepository: UsersRepository,
    private sharedService: SharedService,
    private httpService: HttpService,
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

  async updateAvarta(id: string, body: BaseMultipleFile): Promise<string> {
    const bodyFormData = new FormData();
    bodyFormData.append('image', body.image[0].buffer.toString('base64'));
    const data: ImgbbDto = await lastValueFrom(
      this.httpService
        .post(
          `https://api.imgbb.com/1/upload?key=a72def2770832c960edb9b243b7712b9`,
          bodyFormData,
          {
            headers: { ...bodyFormData.getHeaders() },
          },
        )
        .pipe(map((res: AxiosResponse<{ data: ImgbbDto }>) => res.data.data)),
    );
    if (!data)
      throw new HttpException(
        'some thing wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return this.userRepository.updateAvarta(id, data.url);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.userRepository.findOne({ phoneNumber });
  }

  async findByIdWithRelations(id: string, relations: string[]): Promise<User> {
    return await this.userRepository.findOne({ id }, { relations });
  }
}
