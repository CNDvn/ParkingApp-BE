import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/main/base/base.dto';
import ParkingDTO from 'src/main/parking/dto/parking.dto';
import PriceListDetailDTO from 'src/main/price-list-detail/dto/price-list-detail.dto';

export default class PriceListDTO extends BaseDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public status: string;

  @AutoMap({ typeFn: () => ParkingDTO })
  public parking: ParkingDTO;

  @AutoMap({ typeFn: () => PriceListDetailDTO })
  public priceListDetails: PriceListDetailDTO[];
}
