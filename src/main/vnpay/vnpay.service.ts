import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as querystring from 'qs';
import * as crypto from 'crypto';
import { VnpayDto } from './vnpay.dto';

@Injectable()
export class VnpayService {
  constructor(private configService: ConfigService) {}
  payment(
    ipAddr: string,
    amount: number,
    bankCode: string,
    orderInfo: string,
    orderType: string,
    locale: string,
  ): string {
    let vnpUrl = this.configService.get<string>('VNP_URL');
    const secretKey = this.configService.get<string>('VNP_HASH_SECRET');

    const date = new Date().toISOString().split(new RegExp('[-T:.]'));
    const createDate =
      date[0] + date[1] + date[2] + date[3] + date[4] + date[5];
    const orderId = date[3] + date[4] + date[5];

    if (locale === null || locale === '') {
      locale = 'vn';
    }

    const vnpParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      // vnp_Params['vnp_Merchant'] = '',
      vnp_TmnCode: this.configService.get<string>('VNP_TMN_CODE'),
      vnp_Locale: locale,
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: this.configService.get<string>('VNP_RETURN_URL'),
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_BankCode: '',
    };

    if (bankCode !== null && bankCode !== '') {
      vnpParams.vnp_BankCode = bankCode;
    }
    const vnpParamsSorted = this.sortObject(vnpParams);
    const signData = querystring.stringify(vnpParamsSorted, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnpParamsSorted['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnpParamsSorted, { encode: false });

    return vnpUrl;
  }

  vnpayReturn(vnpayDto: VnpayDto): { message: string; code: string } {
    const secureHash = vnpayDto.vnp_SecureHash;

    delete vnpayDto['vnp_SecureHash'];
    delete vnpayDto['vnp_SecureHashType'];

    const vnpayParams = this.sortObject(vnpayDto);

    const secretKey = this.configService.get<string>('VNP_HASH_SECRET');

    const signData = querystring.stringify(vnpayParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      // kiem tra xem du lieu trong db co hop le khong va thong bao ket qua
      return { message: 'success', code: vnpayDto.vnp_ResponseCode };
    } else {
      // return { message: 'Invalid signature', code: '97' };
      // eslint-disable-next-line no-console
      console.log({ message: 'Invalid signature', code: '97' });
      throw new HttpException(
        'Invalid signature',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  vnpayIpn(@Query() dto: VnpayDto): { RspCode: string; Message: string } {
    const secureHash = dto.vnp_SecureHash;

    delete dto['vnp_SecureHash'];
    delete dto['vnp_SecureHashType'];

    const vnpayParams = this.sortObject(dto);

    const secretKey = this.configService.get<string>('VNP_HASH_SECRET');

    const signData = querystring.stringify(vnpayParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      // const orderId = vnpayParams['vnp_TxnRef'];
      // const rspCode = vnpayParams['vnp_ResponseCode'];
      // kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      return { RspCode: '00', Message: 'success' };
    } else {
      return { RspCode: '97', Message: 'Fail checksum' };
    }
  }

  sortObject(obj: object): object {
    const sorted = {};
    const str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
}
