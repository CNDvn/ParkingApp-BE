import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Car {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  nPlates: string;
  @Column()
  public brand: string;
  @Column()
  public color: string;
  @Column()
  public modelCode: string;
  @Column()
  public status: string;
}

export default Car;
