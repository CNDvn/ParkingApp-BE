import { ParkingRepository } from './parking.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Parking from './parking.entity';

@Injectable()
export class ParkingService extends BaseService<Parking> {
  constructor(private parkingRepository: ParkingRepository) {
    super(parkingRepository);
  }
}
