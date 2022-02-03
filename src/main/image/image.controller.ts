import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/public';

@Controller('image')
@ApiBearerAuth()
@ApiTags('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @Public()
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
    @UploadedFile() image: Express.Multer.File,
  ): Promise<string> {
    return await this.imageService.createImage(image);
  }
}
