import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { StatusEnum } from 'src/utils/status.enum';
import { BaseService } from '../base/base.service';
import { BusinessService } from '../business/business.service';
import User from '../user/user.entity';
import { ParkingCreateDTO } from './dto/parking-create.dto';
import ParkingFilterPagination, {
  ParkingFilterPaginationStatus,
} from './dto/parking-pagination.filter';
import { ParkingUpdateDTO } from './dto/parking-update.dto';
import ParkingDTO from './dto/parking.dto';
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

  async removeOwnerParking(parkingId: string, userId: string): Promise<string> {
    const parking: Parking = await this.getParking(parkingId);
    if (parking.business.id == userId) {
      this.update(parkingId, { status: StatusEnum.IN_ACTIVE });
      return 'Delete successfully';
    }
    return 'Delete failed';
  }

  async createParking(
    user: User,
    parkingCreateDTO: ParkingCreateDTO,
  ): Promise<string> {
    const parking = await this.parkingRepository.findOne({
      name: parkingCreateDTO.name,
      business: user.business,
    });

    if (parking)
      throw new BadRequestException(
        `name parking ${parkingCreateDTO.name} is duplicate`,
      );

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
      StatusEnum.ACTIVE,
    );
    const parkingDTO: ParkingDTO[] = [];
    for (const item of list) {
      parkingDTO.push(this.mapper.map(item, ParkingDTO, Parking));
    }
    return [parkingDTO, count];
  }

  async getAllOwnerParking(
    user: User,
    parkingFilterPagination: ParkingFilterPagination,
  ): Promise<[ParkingDTO[], number]> {
    const [list, count] = await this.parkingRepository.getAllOwnerParkings(
      user.business.id,
      parkingFilterPagination,
    );
    const parkingDTO: ParkingDTO[] = [];
    for (const item of list) {
      parkingDTO.push(this.mapper.map(item, ParkingDTO, Parking));
    }
    return [parkingDTO, count];
  }

  async getParking(id: string): Promise<Parking> {
    return await this.parkingRepository.getParking(id);
  }

  async getParkingIdBusiness(
    idParking: string,
    idBusiness: string,
  ): Promise<Parking> {
    return await this.parkingRepository.getParkingIdBusiness(
      idParking,
      idBusiness,
    );
  }

  async confirmParking(idParking: string): Promise<string> {
    const parking = await this.parkingRepository.getParking(idParking);
    if (parking) {
      await this.update(idParking, { status: StatusEnum.ACTIVE });
      return 'Confirm Parking Success';
    }
    throw new HttpException('Parking not existed', HttpStatus.BAD_REQUEST);
  }

  async rejectParking(idParking: string): Promise<string> {
    const parking = await this.parkingRepository.getParking(idParking);
    if (parking) {
      await this.update(idParking, { status: StatusEnum.REJECT });
      return 'Reject Parking Success';
    }
    throw new HttpException('Parking not existed', HttpStatus.BAD_REQUEST);
  }

  async getParkingProcessing(
    parkingFilterPagination: ParkingFilterPaginationStatus,
  ): Promise<[ParkingDTO[], number]> {
    const [list, count] = await this.parkingRepository.getAllParkings(
      parkingFilterPagination,
      parkingFilterPagination.statusParking,
    );
    const parkingDTO: ParkingDTO[] = [];
    for (const item of list) {
      parkingDTO.push(this.mapper.map(item, ParkingDTO, Parking));
    }
    return [parkingDTO, count];
  }

  async findByIdAndRelations(
    id: string,
    relations: string[],
  ): Promise<Parking> {
    return await this.parkingRepository.findOne(
      { id: id },
      { relations: relations },
    );
  }

  async updateParking(
    idParking: string,
    updateParkingDTO: ParkingUpdateDTO,
  ): Promise<string> {
    const parking = await this.parkingRepository.getParking(idParking);
    if (parking) {
      await this.update(idParking, {
        name: updateParkingDTO.name,
        address: updateParkingDTO.address,
        coordinate: {
          type: 'Point',
          coordinates: [
            updateParkingDTO.coordinate.latitude,
            updateParkingDTO.coordinate.longitude,
          ],
        },
        openTime: updateParkingDTO.openTime,
        closeTime: updateParkingDTO.closeTime,
        phoneNumber: updateParkingDTO.phoneNumber,
      });
      return 'Update Parking Success';
    }
    throw new HttpException('Parking not existed', HttpStatus.BAD_REQUEST);
  }
}
