import { Test, TestingModule } from '@nestjs/testing';
import { PriceListDetailController } from './price-list-detail.controller';
import { PriceListDetailService } from './price-list-detail.service';

describe('PriceListDetailController', () => {
  let controller: PriceListDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceListDetailController],
      providers: [PriceListDetailService],
    }).compile();

    controller = module.get<PriceListDetailController>(PriceListDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
