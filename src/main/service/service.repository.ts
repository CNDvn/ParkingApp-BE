import User from 'src/main/user/user.entity';
import { ServiceCreateDto } from './dto/service-create.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import Parking from '../parking/parking.entity';
import Service from './service.entity';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
  async addService(
    user: User,
    serviceDto: ServiceCreateDto,
    parking: Parking,
  ): Promise<Service> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const service = queryRunner.manager.create(Service, {
        name: serviceDto.name,
        description: serviceDto.description,
        price: serviceDto.price,
        parking: parking,
        createdBy: user.id,
      });

      await queryRunner.manager.save(service);
      await queryRunner.commitTransaction();
      return service;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'something wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
