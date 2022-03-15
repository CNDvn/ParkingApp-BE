import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/main/base/base.dto';
import { BookingDto } from 'src/main/booking/dto/booking.dto';

export default class ParkingSlotStatusDTO extends BaseDto {
  @AutoMap()
  public locationName: string;

  @AutoMap()
  public status: string;

  @AutoMap({ typeFn: () => BookingDto })
  public bookings: BookingDto[];
}
