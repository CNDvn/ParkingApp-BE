import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Business from '../business/business.entity';
import { ParkingService } from '../parking/parking.service';
import {
  ParkingSlotCreateCustom,
  ParkingSlotCreateExtends,
} from './dto/parking-slot-create.dto';
import ParkingSlot from './parking-slot.entity';
import { ParkingSlotRepository } from './parking-slot.repository';

@Injectable()
export class ParkingSlotService extends BaseService<ParkingSlot> {
  constructor(
    private parkingSlotRepository: ParkingSlotRepository,
    private parkingService: ParkingService,
  ) {
    super(parkingSlotRepository);
  }

  async createParkingSlots(
    business: Business,
    parkingSlotCreate: ParkingSlotCreateExtends,
    idParking: string,
  ): Promise<string> {
    const parking = await this.parkingService.findById(idParking);
    if (!parking) {
      throw new BadRequestException('Not found parking');
    }
    return this.parkingSlotRepository.createParkingSlots(
      business,
      parkingSlotCreate,
      idParking,
      parking,
    );
  }

  async createParkingSlot(
    business: Business,
    parkingSlotCreate: ParkingSlotCreateCustom,
    idParking: string,
  ): Promise<string> {
    const parking = await this.parkingService.findById(idParking);
    if (!parking) {
      throw new BadRequestException('Not found parking');
    }
    return this.parkingSlotRepository.createParkingSlot(
      business,
      parkingSlotCreate,
      idParking,
      parking,
    );
  }

  async getAllSlotIdParking(idParking: string): Promise<ParkingSlot[]> {
    const parking = await this.parkingService.findById(idParking);
    if (!parking) {
      throw new BadRequestException('Not found parking');
    }
    return await this.parkingSlotRepository.getParkingSlot(idParking);
  }
}
