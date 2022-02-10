import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { BusinessService } from '../business/business.service';
import User from '../user/user.entity';
import { ParkingCreateDTO } from './dto/parking-create.dto';
import Parking from './parking.entity';
import { ParkingRepository } from './parking.repository';

@Injectable()
export class ParkingService extends BaseService<Parking> {
  constructor(
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

  async getAllParking(): Promise<Parking[]> {
    return await this.parkingRepository.getAllParkings();
  }

  async getAllOwnerParking(user: User): Promise<Parking[]> {
    console.log(user);

    return await this.parkingRepository.getAllOwnerParkings(user.business.id);
  }

  async getParking(id: string): Promise<Parking> {
    return await this.parkingRepository.getParking(id);
  }
}
