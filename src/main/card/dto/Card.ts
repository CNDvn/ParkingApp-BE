import { BaseDto } from '../../base/base.dto';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import Bank from '../../bank/bank.entity';

export class Card extends BaseDto {
  public amount: number;

  public date: Date;

  public code: string;

  public cardHolder: string;

  public bank: Bank;
}
