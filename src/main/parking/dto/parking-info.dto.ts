import { Coordinate } from './parking.dto';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './../../base/base.dto';
export class ParkingInfoDto extends BaseDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public address: string;

  public coordinates: Coordinate;

  @AutoMap()
  public openTime: string;

  @AutoMap()
  public closeTime: string;

  @AutoMap()
  public status: string;

  @AutoMap()
  public phoneNumber: string;
}
