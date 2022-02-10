import { StatusEnum } from 'src/utils/status.enum';
import { EntityRepository, Repository } from 'typeorm';
import Business from '../business/business.entity';
import { ParkingCreateDTO } from './dto/parking-create.dto';
import ParkingFilterPagination from './dto/parking-pagination.filter';
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

  async getAllParkings(
    parkingFilterPagination: ParkingFilterPagination,
  ): Promise<[Parking[], number]> {
    const { address, currentPage, name, sizePage, sort } =
      parkingFilterPagination;
    const [list, count] = await Promise.all([
      await this.createQueryBuilder('parking')
        .where('parking.name like :name', {
          name: name === undefined ? '%%' : `%${name}%`,
        })
        .andWhere('parking.address like :address', {
          address: address === undefined ? '%%' : `%${address}%`,
        })
        .leftJoinAndSelect('parking.business', 'business')
        .leftJoinAndSelect('business.user', 'user')
        .leftJoinAndSelect('user.role', 'role')
        .skip((sizePage as number) * ((currentPage as number) - 1))
        .take(sizePage as number)
        .orderBy('parking.name', sort)
        .getMany(),
      await this.createQueryBuilder('parking')
        .where('parking.name like :name', {
          name: name === undefined ? '%%' : `%${name}%`,
        })
        .andWhere('parking.address like :address', {
          address: address === undefined ? '%%' : `%${address}%`,
        })
        .leftJoinAndSelect('parking.business', 'business')
        .leftJoinAndSelect('business.user', 'user')
        .leftJoinAndSelect('user.role', 'role')
        .skip((sizePage as number) * ((currentPage as number) - 1))
        .take(sizePage as number)
        .orderBy('parking.name', sort)
        .getCount(),
    ]);
    return [list, count];
  }

  async getParking(id: string): Promise<Parking> {
    return await this.createQueryBuilder('parking')
      .where('parking.id = :id', { id: id })
      .leftJoinAndSelect('parking.parkingSlots', 'parking_slot')
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
