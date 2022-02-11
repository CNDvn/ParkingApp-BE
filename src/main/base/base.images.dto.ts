import { ApiFile } from 'src/decorator/files.decorator';

export class BaseMultipleFiles {
  @ApiFile({ isArray: true })
  images: Array<Express.Multer.File>;
}

export class BaseMultipleFile {
  @ApiFile({ isArray: false })
  image: Express.Multer.File;
}
