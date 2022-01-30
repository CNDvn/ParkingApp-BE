import { AutoMap } from '@automapper/classes';
import BusinessDTO from '../business/business.dto';
import CustomerDTO from '../customer/customer.dto';

class UserDTO {
  @AutoMap()
  public firstName: string;

  @AutoMap()
  public lastName: string;

  public fullName: string;

  @AutoMap()
  public DOB: Date;

  @AutoMap()
  public status: string;

  @AutoMap()
  public username: string;

  @AutoMap()
  public phoneNumber: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public address: string;

  @AutoMap()
  public avatar: string;

  @AutoMap({ typeFn: () => CustomerDTO })
  public customer: CustomerDTO;

  @AutoMap({ typeFn: () => BusinessDTO })
  public business: BusinessDTO;
}
export default UserDTO;
