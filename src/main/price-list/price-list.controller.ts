import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { StatusEnum } from 'src/utils/status.enum';
import { Public } from '../auth/public';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import User from '../user/user.entity';
import { PriceListCreate } from './dto/price-list-create.dto';
import { PriceListUpdate } from './dto/price-list-update.dto';
import PriceListDTO from './dto/price-list.dto';
import PriceList from './price-list.entity';
import { PriceListService } from './price-list.service';
@ApiBearerAuth()
@ApiTags('PriceLists')
@Controller('price-lists')
export class PriceListController {
  constructor(private readonly priceListService: PriceListService) {}

  @Roles(RoleEnum.BUSINESS)
  @Post('/:idParking')
  async createTablePrice(
    @Param('idParking') idParking: string,
    @Body() priceListCreate: PriceListCreate,
    @GetUser() user: User,
  ): Promise<string> {
    return this.priceListService.createPriceList(
      user,
      idParking,
      priceListCreate,
    );
  }

  @Public()
  @Get()
  @UseInterceptors(MapInterceptor(PriceListDTO, PriceList, { isArray: true }))
  async getPriceList(): Promise<PriceList[]> {
    return await this.priceListService.getPriceLists();
  }

  @Public()
  @Get('/:idParking')
  @UseInterceptors(MapInterceptor(PriceListDTO, PriceList, { isArray: true }))
  async getPriceListsByIdParking(
    @Param('idParking') idParking: string,
  ): Promise<PriceList[]> {
    return await this.priceListService.getPriceListsByIdParking(idParking);
  }

  @Roles(RoleEnum.BUSINESS)
  @Put('/status/:id')
  @ApiQuery({ name: 'status', enum: StatusEnum })
  async updateStatusPriceList(
    @Param('id') id: string,
    @Query('status') status: StatusEnum = StatusEnum.ACTIVE,
    @GetUser() user: User,
  ): Promise<string> {
    return await this.priceListService.updateStatusPriceList(status, id, user);
  }

  @Roles(RoleEnum.BUSINESS)
  @Put('/:id')
  async updatePriceList(
    @Param('id') id: string,
    @Body() priceListUpdate: PriceListUpdate,
    @GetUser() user: User,
  ): Promise<string> {
    return await this.priceListService.updatePriceList(
      priceListUpdate,
      user,
      id,
    );
  }
}
