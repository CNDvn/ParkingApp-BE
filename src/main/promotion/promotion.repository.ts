import { EntityRepository, getConnection, Repository } from 'typeorm';
import Promotion from './promotion.entity';
import { PromotionUpdateDTO } from './dto/promotion-update.dto';
@EntityRepository(Promotion)
export class PromotionRepository extends Repository<Promotion> {
  async updatePromotion(
    id: string,
    data: PromotionUpdateDTO,
  ): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Promotion)
      .set({
        code: data.code,
        description: data.description,
        percent: data.percent,
      })
      .where('id = :id', { id: id })
      .execute();
    return result.affected > 0;
  }
}
