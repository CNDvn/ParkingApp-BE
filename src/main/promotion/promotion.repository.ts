import { EntityRepository, getConnection, Repository } from 'typeorm';
import Business from '../business/business.entity';
import Promotion from './promotion.entity';
import { PromotionCreateDTO } from './dto/promotion-create.dto';
import { StatusEnum } from 'src/utils/status.enum';
import { PromotionUpdateDTO } from './dto/promotion-update.dto';
@EntityRepository(Promotion)
export class PromotionRepository extends Repository<Promotion> {
  async createPromotion(
    businessOwner: Business,
    promotionCreateDTO: PromotionCreateDTO,
  ): Promise<string> {
    const { code, description, percent } = promotionCreateDTO;
    await this.createQueryBuilder()
      .insert()
      .into(Promotion)
      .values({
        code,
        description,
        percent,
        status: StatusEnum.ACTIVE,
        business: businessOwner,
      })
      .execute();
    return 'create promotion successfull';
  }

  async getAllPromotions(): Promise<Promotion[]> {
    return await this.createQueryBuilder('promotion')
      .leftJoinAndSelect('promotion.business', 'business')
      .leftJoinAndSelect('business.user', 'user')
      .getMany();
  }

  async getPromotion(id: string): Promise<Promotion> {
    return await this.createQueryBuilder('promotion')
      .where('promotion.id = :id', { id: id })
      .leftJoinAndSelect('promotion.business', 'business')
      .leftJoinAndSelect('business.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .getOne();
  }

  async getAllOwnerPromotions(idBusiness: string): Promise<Promotion[]> {
    return await this.createQueryBuilder('promotion')
      .leftJoinAndSelect('promotion.business', 'business')
      .where('business.id = :id', { id: idBusiness })
      .getMany();
  }

  async checkExistPromotion(
    idBusiness: string,
    codePromotion: string,
  ): Promise<Promotion> {
    return await this.createQueryBuilder('promotion')
      .where('promotion.code = :code', { code: codePromotion })
      .leftJoinAndSelect('promotion.business', 'business')
      .andWhere('business.id = :id', { id: idBusiness })
      .getOne();
  }

  async updatePromotion(id: string, data: PromotionUpdateDTO): Promise<string> {
    await getConnection()
      .createQueryBuilder()
      .update(Promotion)
      .set({
        code: data.code,
        description: data.description,
        percent: data.percent,
      })
      .where('id = :id', { id: id })
      .execute();
    return `Update Promotion Successful`;
  }

  async deletePromotion(id: string): Promise<string> {
    await getConnection()
      .createQueryBuilder()
      .update(Promotion)
      .set({ status: StatusEnum.IN_ACTIVE })
      .where('id = :id', { id: id })
      .execute();
    return `Delete Successfull ${id}`;
  }
}
