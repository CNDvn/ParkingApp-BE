import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class SharedService {
  public async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  public async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  public stringToDate(
    _date: string,
    _format: string,
    _delimiter: string,
  ): Date {
    const formatLowerCase = _format.toLowerCase();
    const formatItems = formatLowerCase.split(_delimiter);
    const dateItems = _date.split(_delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    const month = parseInt(dateItems[monthIndex]) - 1;
    const formateDate = new Date(
      +dateItems[yearIndex],
      month,
      +dateItems[dayIndex],
    );
    return formateDate;
  }

  public generateOtp(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
