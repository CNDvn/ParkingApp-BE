import { Controller } from '@nestjs/common';
import { TranferTypeService } from './tranfer-type.service';

@Controller('tranfer-type')
export class TranferTypeController {
  constructor(private readonly tranferTypeService: TranferTypeService) {}
}
