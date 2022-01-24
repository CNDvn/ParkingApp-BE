import { Test, TestingModule } from '@nestjs/testing';
import { CashTransferService } from './cash-transfer.service';

describe('CashTransferService', () => {
  let service: CashTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashTransferService],
    }).compile();

    service = module.get<CashTransferService>(CashTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
