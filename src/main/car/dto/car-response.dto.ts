import { AutoMap } from '@automapper/classes';
import { ImageUrlViewDto } from '../../image/dto/image-url-view.dto';
import { BaseDto } from '../../base/base.dto';
import TypeCarDto from 'src/main/type-car/dto/type-car.dto';
import CustomerDTO from 'src/main/customer/customer.dto';

export class CarResponseDto extends BaseDto {
  @AutoMap()
  public nPlates: string;
  @AutoMap()
  public brand: string;
  @AutoMap()
  public color: string;
  @AutoMap()
  public modelCode: string;
  @AutoMap()
  public images: ImageUrlViewDto[];
  @AutoMap({ typeFn: () => TypeCarDto })
  public typeCar: TypeCarDto;
  @AutoMap()
  public status: string;
  @AutoMap({ typeFn: () => CustomerDTO })
  public customer: CustomerDTO;
}
