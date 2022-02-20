import { UpdateParkingServiceDto } from './dto/service-update.dto';
import { ParkingService } from './../parking/parking.service';
import { BaseService } from './../base/base.service';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import Service from './service.entity';
import { ServiceRepository } from './service.repository';
import User from '../user/user.entity';
import { StatusEnum } from 'src/utils/status.enum';
import { ServiceCreateDto } from './dto/service-create.dto';

@Injectable()
export class ServiceService extends BaseService<Service> {
  constructor(
    private serviceRepository: ServiceRepository,
    private parkingService: ParkingService,
  ) {
    super(serviceRepository);
  }

  async addParkingService(
    user: User,
    serviceDto: ServiceCreateDto,
  ): Promise<Service> {
    const parking = await this.parkingService.getParking(serviceDto.parkingId);
    if (!parking) {
      throw new HttpException('parking invalid', HttpStatus.BAD_REQUEST);
    }
    if (parking.business.id !== user.business.id) {
      throw new HttpException('You not own parking', HttpStatus.BAD_REQUEST);
    }
    const service = await this.serviceRepository.addService(
      user,
      serviceDto,
      parking,
    );
    if (!service) {
      throw new HttpException('cannot add new service', HttpStatus.BAD_REQUEST);
    }
    return service;
  }

  async getAllParkingServices(parkingId: string): Promise<Service[]> {
    const parkingEntity = await this.parkingService.findById(parkingId);
    if (!parkingEntity) {
      throw new HttpException('parking invalid', HttpStatus.BAD_REQUEST);
    }
    const services = await this.serviceRepository.find({
      parking: parkingEntity,
    });

    if (!services || services.length === 0) {
      throw new HttpException('No data.!', HttpStatus.NOT_FOUND);
    }
    return services;
  }

  async updateStatusOwnParkingService(
    id: string,
    status: StatusEnum,
  ): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      id,
    });
    if (!service)
      throw new HttpException(
        'Parking Service not exited',
        HttpStatus.NOT_FOUND,
      );
    service.status = status;
    const save = await this.serviceRepository.save(service);
    return save;
  }

  async updateOwnParkingService(
    user: User,
    id: string,
    serviceDto: UpdateParkingServiceDto,
  ): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      id,
    });
    if (!service) {
      throw new HttpException(
        'Parking Service not existed',
        HttpStatus.NOT_FOUND,
      );
    }
    service.name = serviceDto.name;
    service.description = serviceDto.description;
    service.price = serviceDto.price;
    service.updatedBy = user.id;

    const save = await this.serviceRepository.save(service);
    if (!save) {
      throw new HttpException('update failed', HttpStatus.NOT_FOUND);
    }
    return save;
  }
}
