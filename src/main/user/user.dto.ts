import { AutoMap } from '@automapper/classes';
import BusinessDTO from '../business/business.dto';
import CustomerDTO from '../customer/customer.dto';
import { RoleDTO } from '../role/dto/role.dto';
import { BaseDto } from '../base/base.dto';

class UserDTO extends BaseDto {
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

  @AutoMap({ typeFn: () => RoleDTO })
  public role: RoleDTO;
}
export default UserDTO;
