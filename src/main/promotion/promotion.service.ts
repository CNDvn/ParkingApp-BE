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
    ) {
        super(promotionRepository);
    }

    async createPromotion(
        user: User,
        promotionCreateDTO: PromotionCreateDTO,
    ): Promise<string> {
        const promotion = await this.promotionRepository.checkExistPromotion(
            user.business.id, promotionCreateDTO.code
        );
        if (promotion) {


            throw new BadRequestException(
                `Name promotion ${promotionCreateDTO.code} is duplicate`,
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

    async updatePromotion(id: string,
        user: User, data: PromotionUpdateDTO): Promise<string> {
        const promotion = await this.promotionRepository.findOne({
            code: data.code,
            business: user.business
        });
        if (!promotion) {
            throw new BadRequestException(
                `Promotion ${data.code} is not existed `,
            );
        }
        return await this.promotionRepository.updatePromotion(id, data);
    }


    async deletePromotion(
        user: User, id: string): Promise<string> {
        const pro = await this.promotionRepository.findOne({
            business: user.business, 
            id : id
        })
        if (!pro) {
            throw new BadRequestException(
                `Promotion ${id} is not existed `,
            );
        }
        return await this.promotionRepository.deletePromotion(id);
    }
}

