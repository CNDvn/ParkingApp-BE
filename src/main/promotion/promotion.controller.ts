import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { Public } from '../auth/public';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import User from '../user/user.entity';
import { PromotionCreateDTO } from './dto/promotion-create.dto';
import { PromotionUpdateDTO } from './dto/promotion-update.dto';
import PromotionDTO from './promotion.dto';
import Promotion from './promotion.entity';
import { PromotionService } from './promotion.service';

@ApiBearerAuth()
@ApiTags('Promotions')
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  @Roles(RoleEnum.BUSINESS)
  @ApiResponse({
    status: 201,
    description: 'Create Promotion Success',
  })
  async createPromotion(
    @GetUser() user: User,
    @Body() promotionCreateDTO: PromotionCreateDTO,
  ): Promise<string> {
    return await this.promotionService.createPromotion(
      user,
      promotionCreateDTO,
    );
  }

  @Public()
  @Get()
  @UseInterceptors(MapInterceptor(PromotionDTO, Promotion, { isArray: true }))
  @ApiResponse({
    status: 200,
    description: 'Get All Promotion Success',
  })
  async getAllPromotion(): Promise<Promotion[]> {
    return await this.promotionService.getAllPromotion();
  }

  @Roles(RoleEnum.BUSINESS)
  @Put('updatePromotion/:id')
  @ApiResponse({
    status: 200,
    description: 'Update Promotion',
  })
  async updatePromotion(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() data: PromotionUpdateDTO,
  ): Promise<string> {
    return await this.promotionService.updatePromotion(id, user, data);
  }

  @Roles(RoleEnum.BUSINESS)
  @Delete('delete/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete Promotion',
  })
  async deletePromotion(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<string> {
    return await this.promotionService.deletePromotion(user, id);
  }

  @Roles(RoleEnum.BUSINESS)
  @UseInterceptors(MapInterceptor(PromotionDTO, Promotion, { isArray: true }))
  @Get('OwnerParking')
  @ApiResponse({
    status: 201,
    description: 'Get All Owner Parking Success',
  })
  async getAllOwnerPromotion(@GetUser() user: User): Promise<Promotion[]> {
    return await this.promotionService.getAllOwnerPromotion(user);
  }
}
