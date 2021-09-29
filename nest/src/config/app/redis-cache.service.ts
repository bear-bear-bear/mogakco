import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export default class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  get<T extends string>(key: string): Promise<string | undefined> {
    return this.cache.get<T>(key);
  }

  set<T extends string>(key: string, value: T, ttl?: number) {
    if (ttl) return this.cache.set<T>(key, value, { ttl });
    return this.cache.set<T>(key, value);
  }

  async reset() {
    await this.cache.reset();
  }

  async del(key: string) {
    await this.cache.del(key);
  }
}
