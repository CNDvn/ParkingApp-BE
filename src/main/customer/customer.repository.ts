import { EntityRepository, getConnection, Repository } from 'typeorm';
import User from '../user/user.entity';
import Customer from './customer.entity';
import { CustomerSignUpDto } from './dto/customer.signup';
import { HttpException, HttpStatus } from '@nestjs/common';
import Role from '../role/role.entity';
import { RoleEnum } from '../auth/role/role.enum';
import Wallet from '../wallet/wallet.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async signUp(
    data: CustomerSignUpDto,
    fn: (customer: Customer) => Promise<number>,
  ): Promise<Customer> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      const role = await queryRunner.manager.findOne(Role, {
        where: { name: RoleEnum.CUSTOMER },
      });

      const user = await queryRunner.manager.save(
        queryRunner.manager.create(User, {
          DOB: data.DOB,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          phoneNumber: data.phoneNumber,
          username: data.username,
          address: data.address,
          avatar: data.avatar,
          role: role,
        }),
      );

      const customer = await queryRunner.manager.save(
        queryRunner.manager.create(Customer, { user: user }),
      );

      await queryRunner.manager.save(
        queryRunner.manager.create(Wallet, {
          user,
          currentBalance: 0,
          expiredTime: new Date(),
        }),
      );

      const otp = await fn(customer);

      user.phoneNumberVerifyCode = otp;
      user.phoneNumberVerifyCodeExpire = new Date();
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      return customer;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line no-console
      console.log('error transaction in business repository');
      // eslint-disable-next-line no-console
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      queryRunner.release();
    }
  }
}
