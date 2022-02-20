import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import User from '../user/user.entity';
import Car from './car.entity';
import { CarRepository } from './car.repository';
import { CarCreateDto } from './dto/car-create.dto';
import { TypeCarService } from '../type-car/type-car.service';
import { ImageService } from '../image/image.service';
import { StatusEnum } from '../../utils/status.enum';

@Injectable()
export class CarService extends BaseService<Car> {
  constructor(
    private carRepository: CarRepository,
    private typeCarService: TypeCarService,
    private imageService: ImageService,
  ) {
    super(carRepository);
  }

  async addCar(user: User, carDto: CarCreateDto): Promise<Car> {
    const typeCar = await this.typeCarService.findById(carDto.typeCarId);
    if (!typeCar)
      throw new HttpException('type car invalid', HttpStatus.BAD_REQUEST);
    const car = await this.carRepository.addCar(user, carDto, typeCar);
    if (!car)
      throw new HttpException('cannot add new car', HttpStatus.BAD_REQUEST);
    return car;
  }
  async getAllCars(): Promise<Car[]> {
    const cars = await this.carRepository.find({
      relations: ['typeCar', 'images'],
    });

    if (!cars || cars.length === 0)
      throw new HttpException("User don't have car", HttpStatus.NOT_FOUND);
    return cars;
  }

  async getAllCarsOwner(user: User): Promise<Car[]> {
    const cars = await this.carRepository.find({
      relations: ['typeCar', 'images'],
      where: {
        customer: user.customer,
        status: StatusEnum.ACTIVE,
      },
    });

    if (!cars || cars.length === 0)
      throw new HttpException("User don't have car", HttpStatus.NOT_FOUND);
    return cars;
  }
  async getOwnCar(user: User, id: string): Promise<Car> {
    const car = await this.carRepository.findOne(
      {
        id: id,
        customer: user.customer,
        status: StatusEnum.ACTIVE,
      },
      { relations: ['typeCar', 'images'] },
    );
    if (!car)
      throw new HttpException('This car not existed', HttpStatus.NOT_FOUND);
    return car;
  }

  async updateOwnCar(
    user: User,
    id: string,
    carDto: CarCreateDto,
  ): Promise<Car> {
    const car = await this.carRepository.findOne({
      id: id,
      customer: user.customer,
    });
    if (!car)
      throw new HttpException('This car not existed', HttpStatus.NOT_FOUND);
    const typeCar = await this.typeCarService.findById(carDto.typeCarId);
    if (!typeCar)
      throw new HttpException('type car invalid', HttpStatus.BAD_REQUEST);
    if (carDto.images.length !== 0) {
      const images = await this.imageService.findByIds(carDto.images);
      if (!images || images.length === 0)
        throw new HttpException('Image invalid', HttpStatus.BAD_REQUEST);
      car.images = images;
    }
    car.nPlates = carDto.nPlates;
    car.brand = carDto.brand;
    car.color = carDto.color;
    car.modelCode = carDto.modelCode;
    car.updatedBy = user.id;
    const save = await this.carRepository.save(car);
    if (!save)
      throw new HttpException(
        'update failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return save;
  }

  async updateStatusOwnCar(
    user: User,
    id: string,
    status: StatusEnum,
  ): Promise<Car> {
    const car = await this.carRepository.findOne({
      id,
      customer: user.customer,
    });
    if (!car)
      throw new HttpException('This car not exited', HttpStatus.NOT_FOUND);
    car.status = status;
    const save = await this.carRepository.save(car);
    return save;
  }
}
