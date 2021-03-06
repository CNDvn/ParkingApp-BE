import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
import { FilterPaginationBase } from '../base/filter.pagnigation';
import UserDTO from './user.dto';
import type { Mapper } from '@automapper/types';
import { InjectMapper } from '@automapper/nestjs';
import Business from '../business/business.entity';
import { StatusUser } from './dto/user-update-status.dto';
@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly userRepository: UsersRepository,
    private sharedService: SharedService,
    private httpService: HttpService,
  ) {
    super(userRepository);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne(
      { username },
      { relations: ['role', 'customer', 'business', 'cashTransfers'] },
    );
  }

  async findUserByOTP(otp: number): Promise<User> {
    return await this.userRepository.findOne(
      { phoneNumberVerifyCode: otp },
      { relations: ['role', 'customer', 'business', 'cashTransfers'] },
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
    const user = await this.findById(id);
    if (!user) {
      throw new BadRequestException(`${id} id not found`);
    }
    return await this.userRepository.updateUser(id, data);
  }

  async updateStatusUser(id: string, status: StatusUser): Promise<string> {
    const user = await this.findById(id);
    if (!user) {
      throw new BadRequestException(`${id} id not found`);
    }
    await this.update(id, { status: status });
    return status === StatusUser.ACTIVE
      ? 'Active User Success'
      : 'Ban User Success';
  }

  async updateRefreshToken(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateAvatar(id: string, body: BaseMultipleFile): Promise<string> {
    const bodyFormData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
    return this.userRepository.updateAvatar(id, data.url);
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

  async findAllUserPagination(
    payable: FilterPaginationBase,
    role: string,
    status: string,
    field: string,
    search: string,
  ): Promise<[UserDTO[], number]> {
    const [result, count] = await this.userRepository.getAllUserPagination(
      payable.currentPage as number,
      payable.sizePage as number,
      role,
      status,
      field,
      payable.sort,
      search,
    );
    const userDto: UserDTO[] = [];
    for (const item of result) {
      userDto.push(this.mapper.map(item, UserDTO, User));
    }
    return [userDto, count];
  }

  async findUserByBusiness(business: Business): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { business: business },
      relations: ['business'],
    });
    return user;
  }
}
