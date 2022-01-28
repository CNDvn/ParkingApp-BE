import { AutoMap } from '@automapper/classes';

class CustomerDTO {
  @AutoMap()
  public address: string;

  @AutoMap()
  public status: string;

  @AutoMap()
  public level: number;
}

export default CustomerDTO;
