import { Test, TestingModule } from '@nestjs/testing';
import { PriceListController } from './price-list.controller';
import { PriceListService } from './price-list.service';

describe('PriceListController', () => {
  let controller: PriceListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceListController],
      providers: [PriceListService],
    }).compile();

    controller = module.get<PriceListController>(PriceListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
