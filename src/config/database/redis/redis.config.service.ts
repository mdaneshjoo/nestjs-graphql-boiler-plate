import { CacheModuleOptions, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheOptionsFactory } from '@nestjs/cache-manager/dist/interfaces/cache-module.interface';
import { redisStore } from 'cache-manager-redis-store';
import { CacheStore } from '@nestjs/cache-manager';

@Injectable()
export default class RedisConfigService implements CacheOptionsFactory {
  constructor(private configService: ConfigService) {}

  get HOST(): string {
    return this.configService.get<string>('REDIS.HOST');
  }

  get PORT(): number {
    return +this.configService.get<string>('REDIS.PORT');
  }

  get REDIS_URL(): string {
    return `redis://${this.HOST}:${this.PORT}`;
  }

  async createCacheOptions(): Promise<CacheModuleOptions> {
    return {
      store: (await redisStore({
        url: this.REDIS_URL,
      })) as unknown as CacheStore,
    };
  }
}
