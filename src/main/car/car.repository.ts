import { EntityRepository, getConnection, Repository } from 'typeorm';
import Car from './car.entity';
import User from '../user/user.entity';
import { CarCreateDto } from './dto/car-create.dto';
import TypeCar from '../type-car/type-car.entity';
import Image from '../image/image.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {
  async addCar(
    user: User,
    carDto: CarCreateDto,
    typeCar: TypeCar,
  ): Promise<Car> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const images: Image[] = await queryRunner.manager.findByIds(
        Image,
        carDto.images,
      );

      const car = queryRunner.manager.create(Car, {
        nPlates: carDto.nPlates,
        brand: carDto.brand,
        color: carDto.color,
        modelCode: carDto.modelCode,
        typeCar: typeCar,
        createdBy: user.id,
        customer: user.customer,
        images: images,
      });

      await queryRunner.manager.save(car);
      await queryRunner.commitTransaction();
      return car;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line no-console
      console.log('error transaction in Car repository');
      // eslint-disable-next-line no-console
      console.log(error);
      throw new HttpException(
        'something wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
