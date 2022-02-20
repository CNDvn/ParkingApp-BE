import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile } from '@automapper/core';
import Image from './image.entity';
import { ImageUrlViewDto } from './dto/image-url-view.dto';

@Injectable()
export class ImageProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper: Mapper): void => {
      mapper.createMap(Image, ImageUrlViewDto);
    };
  }
}
