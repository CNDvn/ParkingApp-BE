import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { BankService } from './bank.service';
import Bank from './bank.entity';
import BankDto from './dto/bank.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import { MapInterceptor } from '@automapper/nestjs';

@Controller('banks')
@ApiBearerAuth()
@ApiTags('Banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @UseInterceptors(MapInterceptor(BankDto, Bank))
  async createBank(@Body() dto: BankDto): Promise<Bank> {
    return await this.bankService.addBank(dto);
  }

  @Get()
  @UseInterceptors(MapInterceptor(BankDto, Bank, { isArray: true }))
  async GetAllBank(): Promise<Bank[]> {
    return await this.bankService.getAll();
  }
}
