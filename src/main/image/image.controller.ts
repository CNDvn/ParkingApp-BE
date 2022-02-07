import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import Image from './image.entity';
import { GetUser } from '../../decorator/getUser.decorator';
import User from '../user/user.entity';

@Controller('image')
@ApiBearerAuth()
@ApiTags('Images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async createImage(
    @GetUser() user: User,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Image> {
    return await this.imageService.createImage(user, image);
  }
}
