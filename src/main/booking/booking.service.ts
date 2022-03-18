import { BusinessService } from './../business/business.service';
import { SharedService } from 'src/shared/shared/shared.service';
import { ParkingSlotService } from './../parking-slot/parking-slot.service';
import { StatusEnum } from './../../utils/status.enum';
import { WalletService } from './../wallet/wallet.service';
import { ParkingService } from './../parking/parking.service';
import { CarService } from './../car/car.service';
import User from 'src/main/user/user.entity';
import { BookingRepository } from './booking.repository';
import { BaseService } from './../base/base.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import Booking from './booking.entity';
import { PaymentService } from '../payment/payment.service';
import Payment from '../payment/payment.entity';
import { TypeTimeEnum } from 'src/utils/typeTime.enum';
import Transaction from '../transaction/transaction.entity';

@Injectable()
export class BookingService extends BaseService<Booking> {
  constructor(
    private bookingRepository: BookingRepository,
    private carService: CarService,
    private parkingService: ParkingService,
    private walletService: WalletService,
    private parkingSlotService: ParkingSlotService,
    private paymentService: PaymentService,
    private sharedService: SharedService,
    private businessService: BusinessService,
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

    // for (const item of parking.priceLists[0].priceListDetails) {
    //   if (item.typeCar.id !== car.typeCar.id) {
    //     throw new BadRequestException('This parking can not contain your car');
    //   }
    // }
    const carPrice = parking.priceLists[0].priceListDetails.find((item) => {
      return item.typeCar.id === car.typeCar.id;
    });
    if (!carPrice) {
      throw new BadRequestException('This parking can not contain your car');
    }

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
      throw new BadRequestException('This parking not empty slot now');

    slotEmpty.status = StatusEnum.Full;
    car.status = StatusEnum.BOOKED;
    const booking: Booking = new Booking();
    booking.car = car;
    booking.parking = parking;
    booking.status = StatusEnum.PENDING;
    booking.parkingSlot = slotEmpty;
    booking.checkinTime = null;
    booking.price = priceAHour.price;
    booking.startTime = new Date();

    const result = await this.bookingRepository.bookSlot(
      wallet,
      slotEmpty,
      car,
      booking,
    );
    return result;
  }

  async checkIn(
    user: User,
    parkingId: string,
    carId: string,
  ): Promise<Booking> {
    const car = await this.carService.findById(carId);
    if (!car) throw new BadRequestException('Car not found');

    const parking = await this.parkingService.findByIdAndRelations(parkingId, [
      'business',
    ]);

    if (parking.business.id !== user.business.id)
      throw new BadRequestException(
        'You do not have permission to this parking ',
      );

    const booking = await this.bookingRepository.findOne({
      car: car,
      parking: parking,
      status: StatusEnum.PENDING,
    });

    if (!booking) throw new BadRequestException('Check in fail');

    const result = await this.bookingRepository.checkIn(car, booking);
    return result;
  }

  async checkOut(
    user: User,
    parkingId: string,
    carId: string,
  ): Promise<Payment> {
    const car = await this.carService.getAllOwnCar(user, carId);
    const parking = await this.parkingService.getParking(parkingId);
    const wallet = await this.walletService.getWalletMe(user.id);
    const booking = await this.bookingRepository.findOne(
      {
        car: car,
        parking: parking,
        status: StatusEnum.CHECK_IN,
      },
      { relations: ['service', 'parking', 'parkingSlot', 'payment', 'car'] },
    );
    if (!booking.payment)
      return await this.paymentService.createPayment(booking, wallet);

    return await this.paymentService.updatePayment(
      booking.payment.id,
      booking,
      wallet,
    );
  }

  async getPresentBooking(user: User, carId: string): Promise<Booking> {
    const car = await this.carService.getAllOwnCar(user, carId);

    const result = (
      await this.bookingRepository.find({
        where: { car: car },
        relations: ['service', 'parking', 'parkingSlot', 'payment', 'car'],
      })
    ).filter((booking) => booking.status !== StatusEnum.PAID);

    if (result.length > 1)
      throw new BadRequestException(
        'Get booking invalid. please contact with my admin system',
      );
    if (result.length < 1) throw new BadRequestException('This car is free');

    return result[0];
  }

  async getByIdWithRelations(
    bookingId: string,
    relations: string[],
  ): Promise<Booking> {
    return await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: relations,
    });
  }

  async getHistoryBookingByIdCar(
    carID: string,
    user: User,
  ): Promise<Booking[]> {
    const car = await this.carService.getOwnCar(user, carID);
    const bookings = await this.bookingRepository.find({
      relations: ['car', 'parkingSlot', 'service', 'parking', 'payment'],
      where: {
        car: car,
      },
    });
    return bookings;
  }

  async getHistoryBookingByIdParking(
    parkingID: string,
    user: User,
  ): Promise<Booking[]> {
    const parking = await this.parkingService.getParkingIdBusiness(
      parkingID,
      user.business.id,
    );
    if (!parking) {
      throw new BadRequestException('You not have a parking ');
    }
    const bookings = await this.bookingRepository.find({
      relations: ['car', 'parkingSlot', 'service', 'parking', 'payment'],
      where: {
        parking: parking,
      },
      order: {
        checkinTime: 'DESC',
      },
    });
    return bookings;
  }

  async cancel(user: User, carId: string): Promise<Booking> {
    const now = new Date();
    const car = await this.carService.findById(carId);
    const bookings = await this.bookingRepository.find({
      where: { car, status: StatusEnum.PENDING },
      relations: [
        'car',
        'car.customer',
        'car.customer.user',
        'car.customer.user.wallet',
        'parkingSlot',
        'parking',
        'parking.business',
        'parking.business.user',
        'parking.business.user.wallet',
        'payment',
      ],
    });

    if (bookings.length > 1) throw new BadRequestException('data error');
    if (bookings.length < 1)
      throw new BadRequestException('This car not booked');

    const booking = bookings[0];

    const intervalBooking = this.sharedService.transformTime(
      now.getTime() - booking.startTime.getTime(),
      TypeTimeEnum.M,
    );

    if (intervalBooking <= 2) {
      booking.car.status = StatusEnum.ACTIVE;
      booking.status = StatusEnum.CANCEL;
      booking.parkingSlot.status = StatusEnum.EMPTY;
      booking.car.customer.user.wallet.frozenMoney =
        parseFloat(booking.car.customer.user.wallet.frozenMoney.toString()) -
        parseFloat(booking.price.toString()) * 5;
      booking.car.customer.user.wallet.currentBalance =
        parseFloat(booking.car.customer.user.wallet.currentBalance.toString()) +
        parseFloat(booking.price.toString()) * 5;

      return await this.bookingRepository.cancel(booking, intervalBooking);
    }

    if (intervalBooking <= 30) {
      if (!booking.payment) booking.payment = new Payment();
      booking.payment.amount = booking.price / 2;
      booking.payment.endTime = now;
      return await this.bookingRepository.cancel(booking, intervalBooking);
    }
    if (!booking.payment) booking.payment = new Payment();
    booking.payment.amount = booking.price * (intervalBooking / 60);
    booking.payment.endTime = now;

    return await this.bookingRepository.cancel(booking, intervalBooking);
  }
}
