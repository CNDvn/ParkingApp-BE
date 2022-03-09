import { ParkingSlotService } from './../parking-slot/parking-slot.service';
import { StatusEnum } from './../../utils/status.enum';
import { WalletService } from './../wallet/wallet.service';
import { ParkingService } from './../parking/parking.service';
import { CarService } from './../car/car.service';
import User from 'src/main/user/user.entity';
import { BookingRepository } from './booking.repository';
import { BaseService } from './../base/base.service';
import { Injectable, BadRequestException } from '@nestjs/common';
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
    const car = await this.carService.getAllOwnCar(user, carId);
    const parking = await this.parkingService.getParking(parkingId);
    const wallet = await this.walletService.getWalletMe(user.id);

    if (car.status !== StatusEnum.ACTIVE)
      throw new BadRequestException('Your car is not ready to book');

    const priceAHour = parking.priceLists[0].priceListDetails.find(
      (item) => item.typeCar.id === car.typeCar.id,
    );

    if (wallet.currentBalance < priceAHour.price * 5) {
      throw new BadRequestException('Your wallet not enough price in 5 hours');
    }

    wallet.currentBalance = +wallet.currentBalance - priceAHour.price * 5;
    wallet.frozenMoney = +wallet.frozenMoney + priceAHour.price * 5;

    const slotEmpty = (
      await this.parkingSlotService.getAllSlotIdParking(parkingId)
    ).find((item) => item.status === StatusEnum.EMPTY);
    if (!slotEmpty)
      throw new BadRequestException('This parking not emty slot now');

    const addToDB = async (): Promise<Booking> => {
      await this.walletService.update(wallet.id, {
        currentBalance: wallet.currentBalance,
        frozenMoney: wallet.frozenMoney,
      });
      await this.parkingSlotService.update(slotEmpty.id, {
        status: StatusEnum.Full,
      });
      await this.carService.update(car.id, {
        status: StatusEnum.BOOKED,
      });
      return await this.bookingRepository.save({
        car: car,
        parking: parking,
        status: StatusEnum.PENDING,
        parkingSlot: slotEmpty,
        checkinTime: null,
      });
    };
    return this.bookingRepository.transactionCustom(addToDB);
  }

  async checkIn(
    user: User,
    parkingId: string,
    carId: string,
  ): Promise<Booking> {
    const car = await this.carService.getAllOwnCar(user, carId);
    const parking = await this.parkingService.getParking(parkingId);

    const booking = await this.bookingRepository.findOne({
      car: car,
      parking: parking,
      status: StatusEnum.PENDING,
    });

    if (!booking) throw new BadRequestException('Check in fail');

    const addToDB = async (): Promise<Booking> => {
      this.carService.update(car.id, { status: StatusEnum.IN_PARKING });
      return await this.update(booking.id, {
        checkinTime: new Date(),
        status: StatusEnum.CHECK_IN,
      });
    };
    return this.bookingRepository.transactionCustom(addToDB);
  }
}
