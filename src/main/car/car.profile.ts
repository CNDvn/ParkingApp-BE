import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, mapWith } from '@automapper/core';
import Car from './car.entity';
import { CarResponseDto } from './dto/car-response.dto';
import { ImageUrlViewDto } from '../image/dto/image-url-view.dto';
import Image from '../image/image.entity';

@Injectable()
export class CarProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper): void => {
      mapper.createMap(Car, CarResponseDto).forMember(
        (destination: CarResponseDto) => destination.images,
        mapWith(ImageUrlViewDto, Image, (source: Car) => source.images),
      );
    };
  }
}
