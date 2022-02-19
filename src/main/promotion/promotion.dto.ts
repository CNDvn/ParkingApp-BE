import { AutoMap } from "@automapper/classes";

class PromotionDTO {
    @AutoMap()
    public id: string;


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