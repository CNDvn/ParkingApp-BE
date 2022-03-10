import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { BankService } from './bank.service';
import Bank from './bank.entity';
import { BankDto } from './dto/bank.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('transfer-types')
@ApiBearerAuth()
@ApiTags('TransferTypes')
export class BankController {
  constructor(private readonly tranferTypeService: BankService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @UseInterceptors(MapInterceptor(BankDto, Bank))
  async createType(@Body() dto: BankDto): Promise<Bank> {
    return await this.tranferTypeService.addType(dto);
  }

  @Get()
  @UseInterceptors(MapInterceptor(BankDto, Bank, { isArray: true }))
  async GetAllType(): Promise<Bank[]> {
    return await this.tranferTypeService.getAll();
  }
}
