import { Test, TestingModule } from '@nestjs/testing';
import { PriceListService } from './price-list.service';

describe('PriceListService', () => {
  let service: PriceListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceListService],
    }).compile();

    service = module.get<PriceListService>(PriceListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
