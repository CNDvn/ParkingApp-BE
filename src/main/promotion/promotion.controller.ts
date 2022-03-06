import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import Promotion from './promotion.entity';
import { PromotionService } from './promotion.service';
import { GetUser } from '../../decorator/getUser.decorator';
import User from '../user/user.entity';
import { PromotionCreateDTO } from './dto/promotion-create.dto';
import { Public } from '../auth/public';
import { PromotionUpdateDTO } from './dto/promotion-update.dto';

@ApiBearerAuth()
@ApiTags('Promotions')
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post('/parking/:id')
  // @Roles(RoleEnum.BUSINESS)
  async createParkingPromotion(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() dto: PromotionCreateDTO,
  ): Promise<Promotion> {
    return await this.promotionService.createParkingPromotion(user, id, dto);
  }

  @Get('/parking/:id')
  async getAllParkingPromotion(@Param('id') id: string): Promise<Promotion[]> {
    return await this.promotionService.getAllParkingPromotion(id);
  }

  @Get('/:id')
  async getPromotion(@Param('id') id: string): Promise<Promotion> {
    return this.promotionService.findById(id);
  }

  @Put('/:id')
  async updateParkingPromotion(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() dto: PromotionUpdateDTO,
  ): Promise<Promotion> {
    return await this.promotionService.updateParkingPromotion(id, user, dto);
  }

  @Delete('/:id')
  async setStatusInactivePromotion(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<string> {
    const result = await this.promotionService.setStatusInactivePromotion(
      id,
      user,
    );
    if (result) return 'delete success';
    return 'delete fail';
  }

  @Post('/:id/apply')
  async applyPromotion(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<string> {
    const result = await this.promotionService.applyPromotion(id, user);
    if (result) return 'apply success';
    return 'apply failed';
  }
}
