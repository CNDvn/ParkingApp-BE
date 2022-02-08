import { AutoMap } from '@automapper/classes';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  public id: string;

  @Column('datetime', {
    name: 'CreatedAt',
    default: () => `now()`,
    nullable: false,
  })
  public createdAt: Date;

  @Column('datetime', {
    name: 'UpdatedAt',
    default: () => `now()`,
    nullable: false,
  })
  public updatedAt: Date;

  @Column({ name: 'CreatedBy', nullable: true })
  public createdBy: string;

  @Column({ name: 'UpdatedBy', nullable: true })
  public updatedBy: string;
}

export default BaseEntity;
