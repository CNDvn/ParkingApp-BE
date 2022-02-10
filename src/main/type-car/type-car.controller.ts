import { Controller } from '@nestjs/common';
import { TypeCarService } from './type-car.service';

@Controller('type-cars')
export class TypeCarController {
  constructor(private readonly typeCarService: TypeCarService) {}
}
