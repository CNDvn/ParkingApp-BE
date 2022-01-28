import { EntityRepository, Repository } from 'typeorm';
import { RoleEnum } from '../auth/role/role.enum';
import Role from '../role/role.entity';
import { UserCreateDto } from './dto/user.create.dto';
import User from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(data: UserCreateDto, role: Role): Promise<User> {
    const user = new User();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.DOB = data.DOB;
    user.status = data.status;
    user.username = data.username;
    user.password = data.password;
    user.phoneNumber = data.phoneNumber;
    user.email = data.email;
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
}
