import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import User from '../user/user.entity';
import Promotion from './promotion.entity';
import { PromotionRepository } from './promotion.repository';
import { PromotionCreateDTO } from './dto/promotion-create.dto';
import { ParkingService } from '../parking/parking.service';
import { PromotionUpdateDTO } from './dto/promotion-update.dto';
import { StatusEnum } from '../../utils/status.enum';
import { CustomerPromotionService } from '../customer-promotion/customer-promotion.service';

@Injectable()
export class PromotionService extends BaseService<Promotion> {
  constructor(
    private promotionRepository: PromotionRepository,
    private parkingService: ParkingService,
    private customerPromotionService: CustomerPromotionService,
  ) {
    super(promotionRepository);
  }

  async createParkingPromotion(
    user: User,
    idParking: string,
    promotionCreateDto: PromotionCreateDTO,
  ): Promise<Promotion> {
    const parking = await this.parkingService.getParking(idParking);

    if (!parking || parking.business.id !== user.business.id)
      throw new HttpException(
        'You are not the owner of this parking',
        HttpStatus.BAD_REQUEST,
      );

    return await this.promotionRepository.save({
      code: promotionCreateDto.code,
      percent: promotionCreateDto.percent,
      description: promotionCreateDto.description,
      parking: parking,
      status: StatusEnum.ACTIVE,
    });
  }

  async getAllParkingPromotion(id: string): Promise<Promotion[]> {
    const parking = await this.parkingService.getParking(id);
    if (!parking)
      throw new HttpException('Parking does not exist', HttpStatus.BAD_REQUEST);

    return await this.promotionRepository.find({
      where: { parking, status: StatusEnum.ACTIVE },
    });
  }

  async updateParkingPromotion(
    idPromotion: string,
    user: User,
    promotionUpdateDto: PromotionUpdateDTO,
  ): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { id: idPromotion },
      relations: ['parking'],
    });

    const parking = await this.parkingService.getParking(promotion.parking.id);

    if (parking.business.id !== user.business.id)
      throw new HttpException(
        'You do not have permission to perform this operation',
        HttpStatus.BAD_REQUEST,
      );
    const result = await this.promotionRepository.updatePromotion(
      idPromotion,
      promotionUpdateDto,
    );

    if (!result)
      throw new HttpException(
        'update promotion failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return await this.findById(idPromotion);
  }

  async setStatusInactivePromotion(
    idPromotion: string,
    user: User,
  ): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { id: idPromotion },
      relations: ['parking'],
    });

    const parking = await this.parkingService.getParking(promotion.parking.id);

    if (parking.business.id !== user.business.id)
      throw new HttpException(
        'You do not have permission to perform this operation',
        HttpStatus.BAD_REQUEST,
      );
    promotion.status = StatusEnum.IN_ACTIVE;

    return await this.promotionRepository.save(promotion);
  }

  async applyPromotion(idPromotion: string, user: User): Promise<boolean> {
    const promotion = await this.promotionRepository.findOne({
      where: { id: idPromotion },
    });

    if (!promotion)
      throw new HttpException('Promotion not exist', HttpStatus.BAD_REQUEST);

    return await this.customerPromotionService.applyPromotion(
      promotion,
      user.customer,
    );
  }
}
