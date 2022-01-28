import { AutoMap } from '@automapper/classes';

class BusinessDTO {
  @AutoMap()
  public address: string;

  @AutoMap()
  public status: string;
}

export default BusinessDTO;
