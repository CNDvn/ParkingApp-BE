import { AutoMap } from '@automapper/classes';
import UserDTO from '../user/user.dto';

class BusinessDTO {
  @AutoMap({ typeFn: () => UserDTO })
  public user: UserDTO;
}

export default BusinessDTO;
