import { Controller } from '@nestjs/common';
import { ParkingSlotService } from './parking-slot.service';

@Controller('parking-slot')
export class ParkingSlotController {
  constructor(private readonly parkingSlotService: ParkingSlotService) {}
}
