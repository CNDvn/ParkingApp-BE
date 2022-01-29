import { AutoMap } from '@automapper/classes';

class CustomerDTO {
  @AutoMap()
  public level: number;
}

export default CustomerDTO;
