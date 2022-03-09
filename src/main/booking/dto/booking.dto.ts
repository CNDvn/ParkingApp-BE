import { Injectable } from '@nestjs/common';
import { BaseDto } from '../../base/base.dto';
import { AutoMap } from '@automapper/classes';
import { Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Service from '../../service/service.entity';
import Parking from '../../parking/parking.entity';
import ParkingSlot from '../../parking-slot/parking-slot.entity';
import Payment from '../../payment/payment.entity';
import Car from '../../car/car.entity';
import ServiceDTO from '../../service/service.dto';
import ParkingDTO from '../../parking/dto/parking.dto';
import ParkingSlotDTO from '../../parking-slot/parking-slot.dto';
import { PaymentDto } from '../../payment/dto/payment.dto';
import { CarResponseDto } from '../../car/dto/car-response.dto';

@Injectable()
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

  @AutoMap({ typeFn: () => ParkingDTO })
  public parking: ParkingDTO;

  @AutoMap({ typeFn: () => ParkingSlotDTO })
  public parkingSlot: ParkingSlotDTO;

  @AutoMap({ typeFn: () => PaymentDto })
  public payments: PaymentDto[];

  @AutoMap({ typeFn: () => CarResponseDto })
  public car: CarResponseDto;
}
