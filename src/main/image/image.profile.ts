import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper, MappingProfile } from '@automapper/core';
import imageEntity from './image.entity';
import Image from './image.entity';
import { ImageUrlViewDto } from './dto/image-url-view.dto';

@Injectable()
export class ImageProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper: Mapper) => {
      mapper.createMap(Image, ImageUrlViewDto);
    };
  }
}
