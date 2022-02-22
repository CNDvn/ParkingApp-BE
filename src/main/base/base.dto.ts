import { AutoMap } from '@automapper/classes';

export class BaseDto {
  @AutoMap()
  public id: string;
}
