import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPromotionController } from './customer-promotion.controller';
import { CustomerPromotionService } from './customer-promotion.service';

describe('CustomerPromotionController', () => {
  let controller: CustomerPromotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerPromotionController],
      providers: [CustomerPromotionService],
    }).compile();

    controller = module.get<CustomerPromotionController>(
      CustomerPromotionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
