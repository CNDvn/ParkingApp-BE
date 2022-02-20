import { Injectable, Query } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Parking from './parking.entity';

@Injectable()
export class ParkingService extends BaseService<Parking>{
    async removeOwnerParking(parkingId: string, userId: string): Promise<string> {
        const parking: Parking = await this.findById(parkingId);
        if (parking.business.id == userId) {
            // this.update(parkingId, {status: });
            this.store(parking);
            return 'Delete successfully';
        }
        return 'Delete failed';
    }


}
