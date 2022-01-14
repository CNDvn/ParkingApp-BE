import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Parking {
  @PrimaryGeneratedColumn()
  public Id: number;
  @Column()
  public address: string;
  @Column()
  public longitude: number;
  @Column()
  public latitude: number;
  @Column('time', { name: 'OpenTime' })
  public openTime: Date;
  @Column('time', { name: 'CloseTime' })
  public closeTime: Date;
  @Column()
  public status: string;
}
export default Parking;
