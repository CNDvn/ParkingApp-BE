import { Controller } from '@nestjs/common';
import { TypeCarService } from './type-car.service';

@Controller('type-car')
export class TypeCarController {
  constructor(private readonly typeCarService: TypeCarService) {}
}
