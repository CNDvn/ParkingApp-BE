import { AutoMap } from '@automapper/classes';

import BusinessDTO from '../../business/business.dto';
import { ImageUrlViewDto } from '../../image/dto/image-url-view.dto';
import { BaseDto } from '../../base/base.dto';
import PriceListDTO from 'src/main/price-list/dto/price-list.dto';
export class Coordinate {
  public latitude: number;

  public longitude: number;
}
export default class ParkingDTO extends BaseDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public address: string;

  public coordinates: Coordinate;

  @AutoMap()
  public openTime: string;

  @AutoMap()
  public closeTime: string;

  @AutoMap()
  public status: string;

  @AutoMap()
  public phoneNumber: string;

  @AutoMap({ typeFn: () => BusinessDTO })
  public business: BusinessDTO;

  @AutoMap({ typeFn: () => ImageUrlViewDto })
  public images: ImageUrlViewDto[];

  @AutoMap({ typeFn: () => PriceListDTO })
  public priceLists: PriceListDTO[];
}
