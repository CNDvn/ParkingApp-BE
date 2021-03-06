import { GeometryTransformer } from 'src/utils/geometry-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Point } from 'geojson';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Business from '../business/business.entity';
import Image from '../image/image.entity';
import ParkingSlot from '../parking-slot/parking-slot.entity';
import PriceList from '../price-list/price-list.entity';
import Service from '../service/service.entity';
import { AutoMap } from '@automapper/classes';
import Promotion from '../promotion/promotion.entity';

@Entity()
class Parking extends BaseEntity {
  @AutoMap()
  @Column('varchar', { name: 'Name', length: 200 })
  public name: string;

  @AutoMap()
  @Column('varchar', { name: 'Address', length: 200 })
  public address: string;

  @Column({
    name: 'Coordinate',
    type: 'geometry',
    spatialFeatureType: 'Point',
    transformer: new GeometryTransformer(),
  })
  public coordinate: Point;

  @AutoMap()
  @Column('time', { name: 'OpenTime' })
  public openTime: string;

  @AutoMap()
  @Column('time', { name: 'CloseTime' })
  public closeTime: string;

  @AutoMap()
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;

  @AutoMap()
  @Column('varchar', { name: 'PhoneNumber', length: 20, nullable: false })
  public phoneNumber: string;

  @AutoMap({ typeFn: () => PriceList })
  @OneToMany(() => PriceList, (priceList) => priceList.parking)
  public priceLists: PriceList[];

  @AutoMap({ typeFn: () => Business })
  @ManyToOne(() => Business, (business) => business.parkings)
  @JoinColumn({ name: 'BusinessId' })
  public business: Business;

  @OneToMany(() => Service, (service) => service.parking)
  public services: Service[];

  @OneToMany(() => Booking, (booking) => booking.parking)
  public bookings: Booking[];

  @AutoMap({ typeFn: () => ParkingSlot })
  @OneToMany(() => ParkingSlot, (parkingSlot) => parkingSlot.parking)
  public parkingSlots: ParkingSlot[];

  @AutoMap({ typeFn: () => Image })
  @OneToMany(() => Image, (image) => image.parking)
  public images: Image[];

  @OneToMany(() => Promotion, (promotion) => promotion.parking)
  public promotions: Promotion[];
}

export default Parking;
