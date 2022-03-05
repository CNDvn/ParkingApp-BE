import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/main/base/base.dto';
import UserDTO from 'src/main/user/user.dto';

export class WalletDTO extends BaseDto {
  @AutoMap()
  public currentBalance: number;

  @AutoMap()
  public expiredTime: string;

  @AutoMap()
  public createdTime: string;

  @AutoMap({ typeFn: () => UserDTO })
  public user: UserDTO;
}
