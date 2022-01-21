import { ApiProperty } from '@nestjs/swagger';
export class TypeCarDto {
  @ApiProperty({ name: 'name' })
  public name: string;
}
