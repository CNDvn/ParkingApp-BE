import { Status } from 'src/utils/status.enum';
import { EntityRepository, Repository } from 'typeorm';
import Business from '../business/business.entity';
import { ParkingCreateDTO } from './dto/parking-create.dto';
import Parking from './parking.entity';
@EntityRepository(Parking)
export class ParkingRepository extends Repository<Parking> {
  async createParking(
    businessOwner: Business,
    parkingCreateDTO: ParkingCreateDTO,
  ): Promise<string> {
    const { address, name, closeTime, coordinate, openTime, phoneNumber } =
      parkingCreateDTO;
    await this.createQueryBuilder()
      .insert()
      .into(Parking)
      .values({
        address,
        name,
        closeTime,
        openTime,
        phoneNumber,
        status: Status.ACTIVE,
        business: businessOwner,
        coordinate: {
          type: 'Point',
          coordinates: [coordinate.latitude, coordinate.longitude],
        },
      })
      .execute();
    return 'create parking succesfully';
  }

  async getAllParking(): Promise<Parking[]> {
    return await this.createQueryBuilder('parking')
      .leftJoinAndSelect('parking.business', 'business')
      .leftJoinAndSelect('business.user', 'user')
      .getMany();
  }
}
