import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { BusinessService } from '../business/business.service';
import User from '../user/user.entity';
import { ParkingCreateDTO } from './dto/parking-create.dto';
import ParkingFilterPagination from './dto/parking-pagination.filter';
import ParkingDTO from './parking.dto';
import Parking from './parking.entity';
import { ParkingRepository } from './parking.repository';

@Injectable()
export class ParkingService extends BaseService<Parking> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private parkingRepository: ParkingRepository,
    private businessService: BusinessService,
  ) {
    super(parkingRepository);
  }

  async createParking(
    user: User,
    parkingCreateDTO: ParkingCreateDTO,
  ): Promise<string> {
    const parking = await this.parkingRepository.findOne({
      name: parkingCreateDTO.name,
    });

    if (parking) {
      const parkingExsit = await this.parkingRepository.getParking(parking.id);
      if (parkingExsit.business.id === user.business.id) {
        return await this.parkingRepository.createParking(
          user.business,
          parkingCreateDTO,
        );
      }
      throw new BadRequestException(
        `name parking ${parkingCreateDTO.name} is duplicate`,
      );
    }
    return await this.parkingRepository.createParking(
      user.business,
      parkingCreateDTO,
    );
  }

  async getAllParking(
    parkingFilterPagination: ParkingFilterPagination,
  ): Promise<[ParkingDTO[], number]> {
    const [list, count] = await this.parkingRepository.getAllParkings(
      parkingFilterPagination,
    );
    const parkingDTO: ParkingDTO[] = [];
    for (const item of list) {
      parkingDTO.push(this.mapper.map(item, ParkingDTO, Parking));
    }
    return [parkingDTO, count];
  }

  async getAllOwnerParking(user: User): Promise<Parking[]> {
    return await this.parkingRepository.getAllOwnerParkings(user.business.id);
  }

  async getParking(id: string): Promise<Parking> {
    return await this.parkingRepository.getParking(id);
  }
}
