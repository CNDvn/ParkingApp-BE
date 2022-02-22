import { FilterPaginationBase } from '../../base/filter.pagnigation';
import { ApiProperty } from '@nestjs/swagger';

export class ParkingSlotPaginationFilter extends FilterPaginationBase {
  @ApiProperty({
    type: String,
    description: 'Name Parking Slot',
    required: false,
  })
  name: string;
}
