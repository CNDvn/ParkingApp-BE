import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { BusinessService } from '../business/business.service';
import User from '../user/user.entity';
import { PromotionCreateDTO } from './dto/promotion-create.dto';
import { PromotionUpdateDTO } from './dto/promotion-update.dto';
import Promotion from './promotion.entity';
import { PromotionRepository } from './promotion.repository';

@Injectable()
export class PromotionService extends BaseService<Promotion> {
    constructor(
        private promotionRepository: PromotionRepository,
        private businessService: BusinessService,
    ){
        super(promotionRepository);
    }

    async createPromotion(
        user: User,
        promotionCreateDTO: PromotionCreateDTO,

    ): Promise<string>{
        const promotion = await this.promotionRepository.findOne({
            code: promotionCreateDTO.code,
        });
        if (promotion){
            const promotionExist = await this.promotionRepository.getPromotion(promotion.id);
            if (promotionExist.business.id  === user.business.id){
                return await this.promotionRepository.createPromotion(
                    user.business,
                    promotionCreateDTO,
                );
            

        }throw new BadRequestException(
            `name parking ${promotionCreateDTO.code} is duplicate`,
        );
    }
    return await this.promotionRepository.createPromotion(
        user.business,
        promotionCreateDTO,
    );
    }

    async getAllPromotion(): Promise<Promotion[]> {
        return await this.promotionRepository.getAllPromotions();
      }
    
      async getAllOwnerPromotion(user: User): Promise<Promotion[]> {
        return await this.promotionRepository.getAllOwnerPromotions(user.business.id);
      }

      async updatePromotion (id: string, data: PromotionUpdateDTO): Promise<string>{
          return await this.promotionRepository.updatePromotion(id, data);
      }


      async deletePromotion (promotion: Promotion, id: string): Promise<string>{
        if (promotion.id === id) {
            throw new HttpException(
              "Crazy!!! You can't delete",
              HttpStatus.BAD_REQUEST,
            );
          }
          return await this.promotionRepository.deletePromotion(id);
    }
}
    
