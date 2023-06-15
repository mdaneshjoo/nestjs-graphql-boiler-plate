import { Injectable } from '@nestjs/common';
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler/dist/throttler-module-options.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(private configService: ConfigService) {}

  get RATE_LIMITER_TTL(): number {
    return +this.configService.get<string>('RL.TTL');
  }

  get RATE_LIMITER_LIMIT(): number {
    return +this.configService.get<string>('RL.LIMIT');
  }

  createThrottlerOptions():
    | Promise<ThrottlerModuleOptions>
    | ThrottlerModuleOptions {
    return {
      limit: this.RATE_LIMITER_LIMIT,
      ttl: this.RATE_LIMITER_TTL,
    };
  }
}
