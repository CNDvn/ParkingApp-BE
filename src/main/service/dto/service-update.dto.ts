import { OmitType } from '@nestjs/swagger';
import { ServiceCreateDto } from './service-create.dto';
export class UpdateParkingServiceDto extends OmitType(ServiceCreateDto, [
  'parkingId',
] as const) {}
