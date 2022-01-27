import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoleCreateDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'name' })
  public name: string;
}
