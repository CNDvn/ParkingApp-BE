import { Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/role/roles.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { GetUser } from '../../decorator/getUser.decorator';
import User from '../user/user.entity';
import Transaction from '../transaction/transaction.entity';

@Controller('payments')
@ApiTags('Payments')
@ApiBearerAuth()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/booking/:bookingId')
  @Roles(RoleEnum.CUSTOMER)
  async payment(
    @GetUser() user: User,
    @Param('bookingId') bookingId: string,
  ): Promise<Transaction> {
    return await this.paymentService.payment(bookingId, user);
  }
}
