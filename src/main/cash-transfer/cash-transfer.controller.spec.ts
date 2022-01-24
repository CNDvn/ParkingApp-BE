import { Test, TestingModule } from '@nestjs/testing';
import { CashTransferController } from './cash-transfer.controller';
import { CashTransferService } from './cash-transfer.service';

describe('CashTransferController', () => {
  let controller: CashTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashTransferController],
      providers: [CashTransferService],
    }).compile();

    controller = module.get<CashTransferController>(CashTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
