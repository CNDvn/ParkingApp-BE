import { ParkingInfoDto } from './../../parking/dto/parking-info.dto';
import { BaseDto } from '../../base/base.dto';
import { AutoMap } from '@automapper/classes';
import ServiceDTO from '../../service/service.dto';
import ParkingSlotDTO from '../../parking-slot/parking-slot.dto';
import { PaymentDto } from '../../payment/dto/payment.dto';
import { CarResponseDto } from '../../car/dto/car-response.dto';

export class BookingDto extends BaseDto {
  @AutoMap()
  public startTime: Date;

  @AutoMap()
  public checkinTime: Date;

  @AutoMap()
  public status: string;

  @AutoMap()
  public price: number;

  @AutoMap({ typeFn: () => ServiceDTO })
  public service: ServiceDTO;

  @AutoMap({ typeFn: () => ParkingSlotDTO })
  public parkingSlot: ParkingSlotDTO;

  @AutoMap({ typeFn: () => PaymentDto })
  public payment: PaymentDto;

  @AutoMap({ typeFn: () => CarResponseDto })
  public car: CarResponseDto;

  @AutoMap({ typeFn: () => ParkingInfoDto })
  public parking: ParkingInfoDto;
}
