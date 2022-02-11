import { StatusEnum } from 'src/utils/status.enum';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { RoleEnum } from '../auth/role/role.enum';
import Role from '../role/role.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateProfileDto } from './dto/user-update-profile.dto';
import User from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(data: UserCreateDto, role: Role): Promise<User> {
    const user = new User();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.DOB = data.DOB;
    user.status = StatusEnum.IN_ACTIVE;
    user.username = data.username;
    user.password = data.password;
    user.phoneNumber = data.phoneNumber;
    user.email = data.email;
    user.address = data.address;
    user.avatar = data.avatar;
    user.role = role;
    return await this.save(user);
  }
  async getMeCustomer(user: User): Promise<User> {
    if (user.role.name === RoleEnum.CUSTOMER) {
      const customer = this.createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('user.customer', 'customer')
        .where('user.id = :id', { id: user.id })
        .getOne();
      return customer;
    } else if (user.role.name === RoleEnum.BUSINESS) {
      const business = this.createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('user.business', 'business')
        .where('user.id = :id', { id: user.id })
        .getOne();
      return business;
    }
  }

  async deleteUser(id: string): Promise<string> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ status: StatusEnum.IN_ACTIVE })
      .where('id = :id', { id: id })
      .execute();
    return `Delete Successfull ${id}`;
  }

  async updateUser(id: string, data: UserUpdateProfileDto): Promise<string> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        DOB: data.DOB,
        address: data.address,
        avatar: data.avatar,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        phoneNumber: data.phoneNumber,
      })
      .where('id = :id', { id: id })
      .execute();
    return `Update Profile Successful`;
  }

  async updateAvarta(id: string, img: string): Promise<string> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        avatar: img,
      })
      .where('id = :id', { id: id })
      .execute();
    return `Update Avarta Successful`;
  }
}
