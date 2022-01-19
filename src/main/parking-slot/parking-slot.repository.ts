import { EntityRepository, Repository } from 'typeorm';
import ParkingSlot from './parking-slot.entity';

@EntityRepository(ParkingSlot)
export class ParkingSlotRepository extends Repository<ParkingSlot> {}
