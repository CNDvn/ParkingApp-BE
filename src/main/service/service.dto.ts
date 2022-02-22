import { AutoMap } from '@automapper/classes';
import { BaseDto } from '../base/base.dto';

export default class ServiceDTO extends BaseDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public description: string;

  @AutoMap()
  public price: number;
}
