import { AutoMap } from '@automapper/classes';

export default class ServiceDTO {
  @AutoMap()
  public id: string;

  @AutoMap()
  public name: string;

  @AutoMap()
  public description: string;

  @AutoMap()
  public price: number;
}
