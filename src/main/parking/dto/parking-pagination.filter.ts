import { ApiProperty } from '@nestjs/swagger';
import { FilterPaginationBase } from 'src/main/base/filter.pagnigation';

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
