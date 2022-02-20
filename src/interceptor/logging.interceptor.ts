import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    // eslint-disable-next-line no-console
    console.log('Before...');

    const now = Date.now();
    return (
      next
        .handle()
        // eslint-disable-next-line no-console
        .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))
    );
  }
}
