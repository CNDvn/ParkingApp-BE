import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Business from '../business/business.entity';
import ParkingSlot from '../parking-slot/parking-slot.entity';
import PriceList from '../price-list/price-list.entity';
import Service from '../service/service.entity';

@Entity()
class Parking extends BaseEntity {
  @Column({ name: 'Address' })
  public address: string;
  @Column({ name: 'Longitude' })
  public longitude: number;
  @Column({ name: 'Latitude' })
  public latitude: number;
  @Column('time', { name: 'OpenTime' })
  public openTime: Date;
  @Column('time', { name: 'CloseTime' })
  public closeTime: Date;
  @Column({ name: 'Status' })
  public status: string;
  @OneToMany(() => PriceList, (priceList) => priceList.parking)
  public priceList: PriceList[];
  @ManyToOne(() => Business, (business) => business.parking)
  @JoinColumn({ name: 'BusinessId' })
  public business: Business;
  @OneToMany(() => Service, (service) => service.parking)
  public service: Service[];
  @OneToMany(() => Booking, (booking) => booking.parking)
  public booking: Booking[];
  @OneToMany(() => ParkingSlot, (parkingSlot) => parkingSlot.parking)
  public parkingSlot: ParkingSlot[];
}
export default Parking;
