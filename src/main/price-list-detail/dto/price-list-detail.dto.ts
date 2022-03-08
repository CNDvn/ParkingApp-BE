import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/main/base/base.dto';
import TypeCarDto from 'src/main/type-car/dto/type-car.dto';

export default class PriceListDetailDTO extends BaseDto {
  @AutoMap()
  public price: number;

  @AutoMap({ typeFn: () => TypeCarDto })
  public typeCar: TypeCarDto;
}
