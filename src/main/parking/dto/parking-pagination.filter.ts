import { ApiProperty } from '@nestjs/swagger';
import { FilterPaginationBase } from 'src/main/base/filter.pagnigation';
import { StatusEnum } from 'src/utils/status.enum';

export default class ParkingFilterPagination extends FilterPaginationBase {
  @ApiProperty({
    type: String,
    description: 'Name Parking',
    required: false,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Address Parking',
    required: false,
  })
  address: string;
}

export class ParkingFilterPaginationStatus extends ParkingFilterPagination {
  @ApiProperty({
    enum: StatusEnum,
    description: 'Status Parking',
    required: false,
    default: StatusEnum.REJECT,
  })
  statusParking: StatusEnum;
}
