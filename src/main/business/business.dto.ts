import { AutoMap } from '@automapper/classes';
import { BaseDto } from '../base/base.dto';
import UserDTO from '../user/user.dto';

class BusinessDTO extends BaseDto {
  @AutoMap({ typeFn: () => UserDTO })
  public user: UserDTO;
}

export default BusinessDTO;
