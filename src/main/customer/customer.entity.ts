import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Customer {
  @PrimaryGeneratedColumn({ name: 'Id' })
  public id: number;
  @Column({ name: 'FirstName' })
  public firstName: string;
  @Column({ name: 'LastName' })
  public lastName: string;
  @Column('date', { name: 'DOB' })
  public DOB: Date;
  @Column({ name: 'PhoneNumber' })
  public phoneNumber: string;
  @Column({ name: 'Address' })
  public address: string;
  @Column({ name: 'Status' })
  public status: string;
  @Column({ name: 'Level' })
  public level: string;
}

export default Customer;
