import { AutoMap } from '@automapper/classes';
import BusinessDTO from '../business/business.dto';
import ParkingSlotDTO from '../parking-slot/parking-slot.dto';
export class Coordinate {
  public latitude: number;

  public longitude: number;
}
export default class ParkingDTO {
  @AutoMap()
  public id: string;

  @AutoMap()
  public name: string;

  @AutoMap()
  public address: string;

  public coordinates: Coordinate;

  @AutoMap()
  public openTime: Date;

  @AutoMap()
  public closeTime: Date;

  @AutoMap()
  public status: string;

  @AutoMap()
  public phoneNumber: string;

  @AutoMap({ typeFn: () => BusinessDTO })
  public business: BusinessDTO;

  // @AutoMap({ typeFn: () => ParkingSlotDTO })
  // public parkingSlots: ParkingSlotDTO[];
}
