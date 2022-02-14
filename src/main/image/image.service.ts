import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Image from './image.entity';
import { ImageRepository } from './image.repository';
import * as FormData from 'form-data';
import { lastValueFrom, map } from 'rxjs';
import { ImgbbDto } from './dto/imgbb.dto';
import User from '../user/user.entity';
import { AxiosResponse } from 'axios';
import { BaseMultipleFiles } from '../base/base.images.dto';
import Parking from '../parking/parking.entity';

@Injectable()
export class ImageService extends BaseService<Image> {
  constructor(
    private imageRepository: ImageRepository,
    private httpService: HttpService,
  ) {
    super(imageRepository);
  }
  async createImagesParking(
    user: User,
    baseMultipleFiles: BaseMultipleFiles,
    parking: Parking,
  ): Promise<string> {
    for (const item of baseMultipleFiles.images) {
      const bodyFormData = new FormData();
      const content = Buffer.from(item.buffer).toString('base64');
      bodyFormData.append('image', content);
      const data: ImgbbDto = await lastValueFrom(
        this.httpService
          .post(
            `https://api.imgbb.com/1/upload?key=a72def2770832c960edb9b243b7712b9`,
            bodyFormData,
            {
              headers: { ...bodyFormData.getHeaders() },
            },
          )
          .pipe(map((res: AxiosResponse<{ data: ImgbbDto }>) => res.data.data)),
      );
      if (!data)
        throw new HttpException(
          'some thing wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      const imageEntity = this.imageRepository.create({
        id: data.id,
        title: data.title,
        url: data.url,
        urlViewer: data.url_viewer,
        displayUrl: data.display_url,
        createdBy: user.id,
        parking: parking,
      });
      await this.imageRepository.save(imageEntity);
    }

    return 'Upload Images Successfully';
  }
  async createImage(user: User, image: Express.Multer.File): Promise<Image> {
    const bodyFormData = new FormData();
    bodyFormData.append('image', image.buffer.toString('base64'));
    const data: ImgbbDto = await lastValueFrom(
      this.httpService
        .post(
          `https://api.imgbb.com/1/upload?key=a72def2770832c960edb9b243b7712b9`,
          bodyFormData,
          {
            headers: { ...bodyFormData.getHeaders() },
          },
        )
        .pipe(map((res: AxiosResponse<{ data: ImgbbDto }>) => res.data.data)),
    );

    if (!data)
      throw new HttpException(
        'some thing wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const imageEntity = this.imageRepository.create({
      id: data.id,
      title: data.title,
      url: data.url,
      urlViewer: data.url_viewer,
      displayUrl: data.display_url,
      createdBy: user.id,
    });
    return await this.imageRepository.save(imageEntity);
  }
}
