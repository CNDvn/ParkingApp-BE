import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSlotController } from './parking-slot.controller';
import { ParkingSlotService } from './parking-slot.service';

describe('ParkingSlotController', () => {
  let controller: ParkingSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSlotController],
      providers: [ParkingSlotService],
    }).compile();

    controller = module.get<ParkingSlotController>(ParkingSlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
