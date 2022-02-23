import { AutoMap } from '@automapper/classes';
import { BaseDto } from '../../base/base.dto';

export class RoleDTO extends BaseDto {
  @AutoMap()
  public name: string;
}
