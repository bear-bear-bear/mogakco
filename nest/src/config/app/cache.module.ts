import { CacheModule, Global, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import RedisCacheService from '@config/app/redis-cache.service';

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export default class MogakcoCacheModule {}
