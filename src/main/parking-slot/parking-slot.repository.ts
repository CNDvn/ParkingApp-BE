import { BadRequestException } from '@nestjs/common';
import { StatusEnum } from 'src/utils/status.enum';
import { EntityRepository, Repository } from 'typeorm';
import Business from '../business/business.entity';
import Parking from '../parking/parking.entity';
import {
  ParkingSlotCreateCustom,
  ParkingSlotCreateExtends,
} from './dto/parking-slot-create.dto';
import ParkingSlot from './parking-slot.entity';

@EntityRepository(ParkingSlot)
export class ParkingSlotRepository extends Repository<ParkingSlot> {
  async createParkingSlots(
    business: Business,
    parkingSlotCreate: ParkingSlotCreateExtends,
    idParking: string,
    parking: Parking,
  ): Promise<string> {
    const { amount, prefixName } = parkingSlotCreate;
    const countSlot = await this.createQueryBuilder('parking_slot')
      .leftJoinAndSelect('parking_slot.parking', 'parking')
      .where('parking.id = :id', { id: idParking })
      .getCount();
    const sum = countSlot + amount;
    for (let i = 0; i < sum; i++) {
      await this.createQueryBuilder('parking_slot')
        .insert()
        .into(ParkingSlot)
        .values({
          locationName: prefixName.toUpperCase() + '-' + (i + 1),
          status: StatusEnum.ACTIVE,
          parking,
          createdBy: business.id,
        })
        .execute();
    }

    return 'create parking slot successfully';
  }

  async createParkingSlot(
    business: Business,
    parkingSlotCreate: ParkingSlotCreateCustom,
    idParking: string,
    parking: Parking,
  ): Promise<string> {
    const { nameSlot } = parkingSlotCreate;

    const checkExistSlot = await this.createQueryBuilder('parking_slot')
      .leftJoinAndSelect('parking_slot.parking', 'parking')
      .where('parking.id = :id', { id: idParking })
      .andWhere('parking_slot.locationName = :name', { name: nameSlot })
      .getOne();

    if (checkExistSlot) {
      throw new BadRequestException(`Sorry ${nameSlot} is exsit`);
    }
    await this.createQueryBuilder('parking_slot')
      .insert()
      .into(ParkingSlot)
      .values({
        locationName: nameSlot.toUpperCase(),
        status: StatusEnum.ACTIVE,
        parking,
        createdBy: business.id,
      })
      .execute();

    return 'create parking slot successfully';
  }

  async getParkingSlot(idParking: string): Promise<ParkingSlot[]> {
    const data = await this.createQueryBuilder('parking_slot')
      .leftJoinAndSelect('parking_slot.parking', 'parking')
      .where('parking.id = :id', { id: idParking })
      .getMany();
    return data;
  }
}
