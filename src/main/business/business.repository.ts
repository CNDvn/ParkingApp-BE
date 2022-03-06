import { EntityRepository, getConnection, Repository } from 'typeorm';
import User from '../user/user.entity';
import Business from './business.entity';
import { BusinessSignUpDto } from './dto/business-signup.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import Role from '../role/role.entity';
import { RoleEnum } from '../auth/role/role.enum';
import Wallet from '../wallet/wallet.entity';

@EntityRepository(Business)
export class BusinessRepository extends Repository<Business> {
  async signUp(
    data: BusinessSignUpDto,
    fn: (business: Business) => Promise<number>,
  ): Promise<Business> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      const role = await queryRunner.manager.findOne(Role, {
        where: { name: RoleEnum.BUSINESS },
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

      const business = await queryRunner.manager.save(
        queryRunner.manager.create(Business, {
          user: user,
        }),
      );

      await queryRunner.manager.save(
        queryRunner.manager.create(Wallet, {
          user,
          currentBalance: 0,
          expiredTime: new Date(
            new Date().setFullYear(new Date().getFullYear() + 2),
          ),
        }),
      );

      const otp = await fn(business);

      user.phoneNumberVerifyCode = otp;
      user.phoneNumberVerifyCodeExpire = new Date();
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      return business;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line no-console
      console.log('error transaction in business repository');
      // eslint-disable-next-line no-console
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
  async getBusinessByUserId(id: string): Promise<Business> {
    return await this.createQueryBuilder('business')
      .where('business.UserId = :id', {
        id: id,
      })
      .getOne();
  }
}
