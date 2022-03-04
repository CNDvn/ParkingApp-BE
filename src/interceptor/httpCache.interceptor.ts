/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
    const excludePaths = [
      // Routes to be excluded
    ];

    if (
      !isGetRequest ||
      (isGetRequest &&
        excludePaths.includes(httpAdapter.getRequestUrl(request)))
    ) {
      return undefined;
    }
    return httpAdapter.getRequestUrl(request);
  }
}
