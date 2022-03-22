import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T> {
    return await this.cache.get(key);
  }

  async set<T>(key: string, value: T): Promise<T> {
    return await this.cache.set(key, value);
  }

  async remove<T>(key: string): Promise<T> {
    return (await this.cache.del(key)) as T;
  }

  async resetAll(): Promise<void> {
    await this.cache.reset();
  }

  async clearCache(cacheKey: string): Promise<void> {
    const keys: string[] = (await this.cache.store.keys()) as string[];
    for (const key of keys) {
      if (key.startsWith(cacheKey)) {
        await this.cache.del(key);
      }
    }
  }
}
