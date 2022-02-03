import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Image from './image.entity';
import { ImageRepository } from './image.repository';
import * as FormData from 'form-data';

@Injectable()
export class ImageService extends BaseService<Image> {
  constructor(
    private imageRepository: ImageRepository,
    private httpService: HttpService,
  ) {
    super(imageRepository);
  }

  createImage(image: Express.Multer.File): Promise<string> {
    const bodyFormData = new FormData();
    bodyFormData.append('image', image.buffer.toString('base64'));
    const result = this.httpService.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=a72def2770832c960edb9b243b7712b9`,
      bodyFormData,
      {
        headers: { ...bodyFormData.getHeaders() },
      },
    );
    result.subscribe();
    return null;
  }
}
