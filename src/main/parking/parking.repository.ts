import { BadRequestException } from '@nestjs/common';
import { StatusEnum } from 'src/utils/status.enum';
import { EntityRepository, Repository } from 'typeorm';
import Business from '../business/business.entity';
import { Coordinate, ParkingCreateDTO } from './dto/parking-create.dto';
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
        status: StatusEnum.PROCESSING,
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
  async updateLongLat(id: string, dto: Coordinate): Promise<Parking> {
    const parking = await this.findOne({ id: id });

    if (!parking) throw new BadRequestException('parking not exist');

    parking.coordinate = {
      type: 'Point',
      coordinates: [dto.latitude, dto.longitude],
    };

    return await this.save(parking);
  }

  async getAllParkings(
    parkingFilterPagination: ParkingFilterPagination,
    status: StatusEnum,
  ): Promise<[Parking[], number]> {
    const { address, currentPage, name, sizePage, sort } =
      parkingFilterPagination;

    const query = this.createQueryBuilder('parking')
      .where('parking.name like :name', {
        name: name === undefined ? '%%' : `%${name}%`,
      })
      .andWhere('parking.address like :address', {
        address: address === undefined ? '%%' : `%${address}%`,
      })
      .andWhere('parking.status like :status', { status: status })
      .leftJoinAndSelect('parking.business', 'business')
      .leftJoinAndSelect('parking.images', 'image')
      .leftJoinAndSelect('business.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('parking.parkingSlots', 'slot');

    const [list, count] = await Promise.all([
      query
        .skip((sizePage as number) * ((currentPage as number) - 1))
        .take(sizePage as number)
        .orderBy('parking.name', sort)
        .getMany(),
      query.getCount(),
    ]);
    return [list, count];
  }

  async getParking(id: string): Promise<Parking> {
    return await this.createQueryBuilder('parking')
      .where('parking.id = :id', { id: id })
      .leftJoinAndSelect('parking.parkingSlots', 'parking_slot')
      .leftJoinAndSelect('parking.business', 'business')
      .leftJoinAndSelect('parking.priceLists', 'priceLists')
      .leftJoinAndSelect('priceLists.parking', 'parkingPrice')
      .andWhere('priceLists.status = :statusPriceList', {
        statusPriceList: StatusEnum.ACTIVE,
      })
      .leftJoinAndSelect('priceLists.priceListDetails', 'priceListDetails')
      .leftJoinAndSelect('priceListDetails.typeCar', 'typeCar')
      .leftJoinAndSelect('parking.images', 'image')
      .leftJoinAndSelect('business.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .getOne();
  }

  async getAllOwnerParkings(
    idBusiness: string,
    parkingFilterPagination: ParkingFilterPagination,
  ): Promise<[Parking[], number]> {
    const { address, currentPage, name, sizePage, sort } =
      parkingFilterPagination;
    const query = this.createQueryBuilder('parking')
      .where('parking.name like :name', {
        name: name === undefined ? '%%' : `%${name}%`,
      })
      .andWhere('parking.address like :address', {
        address: address === undefined ? '%%' : `%${address}%`,
      })
      .leftJoinAndSelect('parking.parkingSlots', 'parking_slot')
      .leftJoinAndSelect('parking.business', 'business')
      .leftJoinAndSelect('parking.images', 'image')
      .leftJoinAndSelect('business.user', 'user')
      .andWhere('business.id = :id', { id: idBusiness })
      .leftJoinAndSelect('user.role', 'role');
    const [list, count] = await Promise.all([
      query
        .skip((sizePage as number) * ((currentPage as number) - 1))
        .take(sizePage as number)
        .orderBy('parking.name', sort)
        .getMany(),
      query.getCount(),
    ]);
    return [list, count];
  }

  async getParkingIdBusiness(
    idParking: string,
    idBusiness: string,
  ): Promise<Parking> {
    return await this.createQueryBuilder('parking')
      .where('parking.id = :id', {
        id: idParking,
      })
      .leftJoinAndSelect('parking.business', 'business')
      .andWhere('business.id = :idBusiness', { idBusiness: idBusiness })
      .getOne();
  }
}
