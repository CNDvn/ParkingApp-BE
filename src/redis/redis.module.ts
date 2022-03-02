import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-redis-store';
// @Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        store: redisStore,
        host: configService.get('REDIS_HOST') as string,
        port: +configService.get('REDIS_PORT'),
        ttl: +configService.get('CACHE_TTL'),
        max: 100,
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
