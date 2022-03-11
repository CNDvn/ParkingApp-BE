import { CardCreateDto } from './dto/card-create.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CardService } from './card.service';
import Card from './card.entity';
import { GetUser } from 'src/decorator/getUser.decorator';
import User from '../user/user.entity';
import { MapInterceptor } from '@automapper/nestjs';
import CardDto from './dto/card.dto';

@Controller('cards')
@ApiTags('Cards')
@ApiBearerAuth()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('/bank/:bankId')
  @UseInterceptors(MapInterceptor(CardDto, Card))
  async addCard(
    @Body() dto: CardCreateDto,
    @Param('bankId') bankId: string,
    @GetUser() user: User,
  ): Promise<Card> {
    return await this.cardService.addCard(dto, bankId, user);
  }

  @Get('/:id')
  @UseInterceptors(MapInterceptor(CardDto, Card))
  async getOwnCard(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Card> {
    return await this.cardService.getOwnCard(user, id);
  }

  @Get()
  @UseInterceptors(MapInterceptor(CardDto, Card, { isArray: true }))
  async getAllOwnCard(@GetUser() user: User): Promise<Card[]> {
    return await this.cardService.getAllOwnCard(user);
  }

  @Put('/:id')
  @UseInterceptors(MapInterceptor(CardDto, Card))
  async updateOwnCard(
    @GetUser() user: User,
    @Body() dto: CardCreateDto,
    @Param('id') id: string,
  ): Promise<Card> {
    return await this.cardService.updateOwnCard(user, dto, id);
  }
}
