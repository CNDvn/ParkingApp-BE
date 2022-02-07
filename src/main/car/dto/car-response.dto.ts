import { AutoMap } from '@automapper/classes';
import { ImageUrlViewDto } from '../../image/dto/image-url-view.dto';

export class CarResponseDto {
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
}
