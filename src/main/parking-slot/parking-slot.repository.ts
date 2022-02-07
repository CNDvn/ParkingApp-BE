import { StatusEnum } from 'src/utils/status.enum';
import { EntityRepository, Repository } from 'typeorm';
import Business from '../business/business.entity';
import Parking from '../parking/parking.entity';
import {
  ParkingSlotCreate,
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
    parkingSlotCreate: ParkingSlotCreate,
    idParking: string,
    parking: Parking,
  ): Promise<string> {
    const { prefixName } = parkingSlotCreate;
    const countSlot = await this.createQueryBuilder('parking_slot')
      .leftJoinAndSelect('parking_slot.parking', 'parking')
      .where('parking.id = :id', { id: idParking })
      .getCount();
    await this.createQueryBuilder('parking_slot')
      .insert()
      .into(ParkingSlot)
      .values({
        locationName: prefixName.toUpperCase() + '-' + (countSlot + 1),
        status: StatusEnum.ACTIVE,
        parking,
        createdBy: business.id,
      })
      .execute();

    return 'create parking slot successfully';
  }
}
