import { Test, TestingModule } from '@nestjs/testing';
import { PriceListDetailService } from './price-list-detail.service';

describe('PriceListDetailService', () => {
  let service: PriceListDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceListDetailService],
    }).compile();

    service = module.get<PriceListDetailService>(PriceListDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
