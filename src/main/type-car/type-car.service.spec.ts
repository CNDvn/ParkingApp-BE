import { Test, TestingModule } from '@nestjs/testing';
import { TypeCarService } from './type-car.service';

describe('TypeCarService', () => {
  let service: TypeCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeCarService],
    }).compile();

    service = module.get<TypeCarService>(TypeCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
