import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserCreateDto } from 'src/main/user/dto/user.create.dto';

export class CustomerSignUpDto extends UserCreateDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'address' })
  public address: string;

  // @IsNotEmpty()
  // @ApiProperty({ type: Number, description: 'level', default: 0 })
  public level: number;
}
