import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserCreateDto } from 'src/main/user/dto/user.create.dto';

export class BusinessSignUpDto extends UserCreateDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'address' })
  public address: string;
}
