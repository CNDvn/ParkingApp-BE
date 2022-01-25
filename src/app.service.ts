import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new HttpException('Hello', HttpStatus.FORBIDDEN);
    return 'Hello World!';
  }
}
