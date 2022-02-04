import { GeometryTransformer } from 'src/utils/geometry-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Geometry } from 'geojson';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Business from '../business/business.entity';
import Image from '../image/image.entity';
import ParkingSlot from '../parking-slot/parking-slot.entity';
import PriceList from '../price-list/price-list.entity';
import Service from '../service/service.entity';

@Entity()
class Parking extends BaseEntity {
  @Column('varchar', { name: 'Name', length: 200 })
  public name: string;

  @Column('varchar', { name: 'Address', length: 200 })
  public address: string;

  @Column({
    name: 'Coordinate',
    type: 'geometry',
    spatialFeatureType: 'Point',
    // transformer: new GeometryTransformer(),
  })
  public coordinate: Geometry;

  @Column('time', { name: 'OpenTime' })
  public openTime: Date;

  @Column('time', { name: 'CloseTime' })
  public closeTime: Date;

  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;

  @Column('varchar', { name: 'PhoneNumber', length: 20, nullable: false })
  public phoneNumber: string;

  @OneToMany(() => PriceList, (priceList) => priceList.parking)
  public priceLists: PriceList[];

  @ManyToOne(() => Business, (business) => business.parkings)
  @JoinColumn({ name: 'BusinessId' })
  public business: Business;

  @OneToMany(() => Service, (service) => service.parking)
  public services: Service[];

  @OneToMany(() => Booking, (booking) => booking.parking)
  public bookings: Booking[];

  @OneToMany(() => ParkingSlot, (parkingSlot) => parkingSlot.parking)
  public parkingSlots: ParkingSlot[];

  @OneToMany(() => Image, (image) => image.parking)
  public images: Image[];
}
export default Parking;
