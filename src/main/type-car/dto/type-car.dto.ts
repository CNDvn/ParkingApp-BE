import { BaseDto } from '../../base/base.dto';
import { AutoMap } from '@automapper/classes';

export default class TypeCarDto extends BaseDto {
  @AutoMap()
  public name: string;
}
