import { PaymentRepository } from './payment.repository';
import { Injectable } from '@nestjs/common';
import Payment from './payment.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class PaymentService extends BaseService<Payment> {
  constructor(private paymentRepository: PaymentRepository) {
    super(paymentRepository);
  }
}
