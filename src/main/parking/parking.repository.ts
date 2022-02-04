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
    const data = [coordinate.latitude, coordinate.longitude];
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
        coordinate: () =>
          `ST_GeomFromGeoJSON( '{ "type": "Point", "coordinates": [${data}] }' )`,
        // coordinate: {
        //   type: 'Point',
        //   coordinates: data,
        // },
      })
      .execute();
    return 'create parking succesfully';
  }
}
