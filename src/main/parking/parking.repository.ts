import { StatusEnum } from 'src/utils/status.enum';
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
        status: StatusEnum.ACTIVE,
        business: businessOwner,
        coordinate: {
          type: 'Point',
          coordinates: [coordinate.latitude, coordinate.longitude],
        },
        createdBy: businessOwner.id,
      })
      .execute();
    return 'create parking succesfully';
  }

  async getAllParkings(): Promise<Parking[]> {
    return await this.createQueryBuilder('parking')
      .leftJoinAndSelect('parking.business', 'business')
      .leftJoinAndSelect('business.user', 'user')
      .getMany();
  }

  async getParking(id: string): Promise<Parking> {
    return await this.createQueryBuilder('parking')
      .where('parking.id = :id', { id: id })
      .leftJoinAndSelect('parking.business', 'business')
      .leftJoinAndSelect('business.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .getOne();
  }

  async getAllOwnerParkings(idBusiness: string): Promise<Parking[]> {
    return await this.createQueryBuilder('parking')
      .leftJoinAndSelect('parking.business', 'business')
      .leftJoinAndSelect('business.user', 'user')
      .where('business.id = :id', { id: idBusiness })
      .leftJoinAndSelect('user.role', 'role')
      .getMany();
  }
}
