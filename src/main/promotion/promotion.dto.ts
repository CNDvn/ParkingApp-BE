import { AutoMap } from '@automapper/classes';
import { BaseDto } from '../base/base.dto';

class PromotionDTO extends BaseDto {
  @AutoMap()
  public code: string;

  @AutoMap()
  public percent: number;

  @AutoMap()
  public description: string;

  @AutoMap()
  public status: string;
}
export default PromotionDTO;
