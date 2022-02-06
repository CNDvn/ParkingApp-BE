import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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

  async creatParking(
    user: User,
    parkingCreateDTO: ParkingCreateDTO,
  ): Promise<string> {
    const parking = await this.parkingRepository.findOne({
      name: parkingCreateDTO.name,
    });
    if (parking) {
      throw new BadRequestException(
        `${parkingCreateDTO.name} is duplicate name parking`,
      );
    }
    const businessOwner = await this.businessService.findByIdUser(user.id);
    console.log(businessOwner);
    return await this.parkingRepository.createParking(
      businessOwner,
      parkingCreateDTO,
    );
  }

  async getAllParking(): Promise<Parking[]> {
    return await this.parkingRepository.getAllParking();
  }
}
