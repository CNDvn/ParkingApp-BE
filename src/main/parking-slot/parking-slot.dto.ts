import { AutoMap } from '@automapper/classes';

export default class ParkingSlotDTO {
  @AutoMap()
  public id: string;

  @AutoMap()
  public locationName: string;

  @AutoMap()
  public status: string;
}
