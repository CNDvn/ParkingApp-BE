import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { ImageProfile } from './image.profile';

@Module({
  imports: [TypeOrmModule.forFeature([ImageRepository]), HttpModule],
  controllers: [ImageController],
  providers: [ImageService, ImageProfile],
  exports: [ImageService],
})
export class ImageModule {}
