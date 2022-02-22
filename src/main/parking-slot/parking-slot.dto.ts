import { AutoMap } from '@automapper/classes';
import { BaseDto } from '../base/base.dto';

export default class ParkingSlotDTO extends BaseDto {
  @AutoMap()
  public locationName: string;

  @AutoMap()
  public status: string;
}
