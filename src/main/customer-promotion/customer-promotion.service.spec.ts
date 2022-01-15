import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPromotionService } from './customer-promotion.service';

describe('CustomerPromotionService', () => {
  let service: CustomerPromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerPromotionService],
    }).compile();

    service = module.get<CustomerPromotionService>(CustomerPromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
