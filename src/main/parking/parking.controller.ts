import { Controller, Delete, Param } from '@nestjs/common';
import { GetUser } from 'src/decorator/getUser.decorator';
import { Payload } from '../auth/jwt/payload';
import { Public } from '../auth/public';
import { ParkingService } from './parking.service';

@Controller('parkings')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) { }
 
  @Delete('/:id')
  async remove(@Param('id') id: string, @GetUser() user: Payload) {
    return await this.parkingService.removeOwnerParking(id, user.id);
  }

}
