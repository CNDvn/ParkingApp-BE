import { UserCreateDto } from 'src/main/user/dto/user.create.dto';

export class CustomerSignUpDto extends UserCreateDto {
  public level: number;
}
