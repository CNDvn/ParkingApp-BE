import { ApiProperty } from '@nestjs/swagger';
import { Length, Validate } from 'class-validator';
import { IsNotBlank } from '../../../validator/is-not-blank.validation';

export class createTypeCarDto {
  @ApiProperty({ type: String, description: 'name' })
  @Validate(IsNotBlank)
  @Length(1, 100)
  public name: string;
}
