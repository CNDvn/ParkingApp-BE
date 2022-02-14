import { OmitType } from "@nestjs/swagger";
import { PromotionCreateDTO } from './promotion-create.dto';

export class PromotionUpdateDTO extends OmitType (PromotionCreateDTO, ['status',] as const){}