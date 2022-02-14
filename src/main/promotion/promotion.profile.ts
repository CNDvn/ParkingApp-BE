import { Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { map } from "rxjs";
import PromotionDTO from "./promotion.dto";
import Promotion from "./promotion.entity";

@Injectable()
export class PromotionProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile() {
        return (mapper: Mapper): void => {
            mapper.createMap(Promotion, PromotionDTO)
        }
    }

}