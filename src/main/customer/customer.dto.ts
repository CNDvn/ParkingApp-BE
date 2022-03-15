import { AutoMap } from '@automapper/classes';
import { BaseDto } from '../base/base.dto';
import UserDTO from '../user/user.dto';

class CustomerDTO extends BaseDto {
  @AutoMap()
  public level: number;
  @AutoMap({ typeFn: () => UserDTO })
  public user: UserDTO;
}

export default CustomerDTO;
