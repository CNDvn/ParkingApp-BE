import { AutoMap } from '@automapper/classes';
import ParkingSlotDTO from '../../parking-slot/parking-slot.dto';
import ParkingDTO from './parking.dto';

export default class ParkingDetailDto extends ParkingDTO {
  @AutoMap({ typeFn: () => ParkingSlotDTO })
  public parkingSlots: ParkingSlotDTO[];
}
