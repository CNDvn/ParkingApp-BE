import { Controller } from '@nestjs/common';
import { ParkingSlotService } from './parking-slot.service';

@Controller('parking-slots')
export class ParkingSlotController {
  constructor(private readonly parkingSlotService: ParkingSlotService) {}
}
