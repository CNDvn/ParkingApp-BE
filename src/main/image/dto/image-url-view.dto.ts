import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/main/base/base.dto';

export class ImageUrlViewDto extends BaseDto {
  @AutoMap()
  url: string;
}
