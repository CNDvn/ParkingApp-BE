import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile } from '@automapper/core';
import { BookingDto } from './dto/booking.dto';
import Booking from './booking.entity';

@Injectable()
export class BookingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper: Mapper): void => {
      mapper.createMap(Booking, BookingDto);
    };
  }
}
