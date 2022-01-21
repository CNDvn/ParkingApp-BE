import { ParkingSlotRepository } from './parking-slot.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import ParkingSlot from './parking-slot.entity';

@Injectable()
export class ParkingSlotService extends BaseService<ParkingSlot> {
  constructor(private parkingSlotRepository: ParkingSlotRepository) {
    super(parkingSlotRepository);
  }
}
