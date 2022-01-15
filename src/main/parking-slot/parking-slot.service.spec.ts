import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSlotService } from './parking-slot.service';

describe('ParkingSlotService', () => {
  let service: ParkingSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingSlotService],
    }).compile();

    service = module.get<ParkingSlotService>(ParkingSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
