import { AutoMap } from '@automapper/classes';

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
}
export default UserDTO;
