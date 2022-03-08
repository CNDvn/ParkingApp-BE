import { ParkingSlotService } from './../parking-slot/parking-slot.service';
import { StatusEnum } from './../../utils/status.enum';
import { WalletService } from './../wallet/wallet.service';
import { ParkingService } from './../parking/parking.service';
import { CarService } from './../car/car.service';
import User from 'src/main/user/user.entity';
import { BookingRepository } from './booking.repository';
import { BaseService } from './../base/base.service';
import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import Booking from './booking.entity';

@Injectable()
export class BookingService extends BaseService<Booking> {
  constructor(
    private bookingRepository: BookingRepository,
    private carService: CarService,
    private parkingService: ParkingService,
    private walletService: WalletService,
    private parkingSlotService: ParkingSlotService,
  ) {
    super(bookingRepository);
  }

  async bookSlot(
    user: User,
    parkingId: string,
    carId: string,
  ): Promise<Booking> {
    const car = await this.carService.getOwnCar(user, carId);
    const parking = await this.parkingService.getParking(parkingId);
    const wallet = await this.walletService.getWalletMe(user.id);

    const priceAHour = parking.priceLists[0].priceListDetails.find(
      (item) => item.typeCar === car.typeCar,
    );

    if (wallet.currentBalance < priceAHour.price * 5) {
      throw new BadRequestException('Your wallet not enough price in 5 hours');
    }

    wallet.currentBalance -= priceAHour.price * 5;
    wallet.frozenMoney += priceAHour.price * 5;
    this.walletService.update(wallet.id, wallet);

    const slotEmpty = (
      await this.parkingSlotService.getAllSlotIdParking(parkingId)
    ).find((item) => item.status === StatusEnum.EMPTY);
    if (!slotEmpty)
      throw new BadRequestException('This parking not emty slot now');

    await this.parkingSlotService.update(slotEmpty.id, {
      status: StatusEnum.Full,
    });
    return await this.bookingRepository.save({
      car: car,
      parking: parking,
      status: StatusEnum.BOOKED,
      parkingSlot: slotEmpty,
    });
  }
}
