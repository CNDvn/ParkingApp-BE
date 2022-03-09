import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './payment.repository';
import { PaymentProfile } from './payment.profile';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentRepository])],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentProfile],
  exports: [PaymentService],
})
export class PaymentModule {}
