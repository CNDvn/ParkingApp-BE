import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

describe('BusinessController', () => {
  let controller: BusinessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [BusinessService],
    }).compile();

    controller = module.get<BusinessController>(BusinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
