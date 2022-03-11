import { Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CardCreateDto {
  @Matches(/[0-9]{2}-[0-9]{4}/, { message: 'dateValidFrom invalid' })
  @ApiProperty({ name: 'dateValidFrom' })
  public dateValidFrom: string;

  @Matches(/[0-9]+/, { message: 'cardNumber invalid' })
  @ApiProperty({ name: 'cardNumber' })
  public cardNumber: string;

  @ApiProperty({ name: 'cardHolder' })
  public cardHolder: string;
}
