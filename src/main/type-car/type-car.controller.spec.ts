import { Test, TestingModule } from '@nestjs/testing';
import { TypeCarController } from './type-car.controller';
import { TypeCarService } from './type-car.service';

describe('TypeCarController', () => {
  let controller: TypeCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeCarController],
      providers: [TypeCarService],
    }).compile();

    controller = module.get<TypeCarController>(TypeCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
