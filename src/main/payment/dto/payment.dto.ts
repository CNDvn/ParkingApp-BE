import { AutoMap } from '@automapper/classes';
import { BaseDto } from '../../base/base.dto';
import { Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Transaction from '../../transaction/transaction.entity';
import Booking from '../../booking/booking.entity';

export class PaymentDto extends BaseDto {
  @AutoMap()
  public amount: number;

  @AutoMap()
  public endTime: Date;

  @AutoMap()
  public type: string;
}
