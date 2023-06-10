import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import ThrottlerConfigService from './throttler.config.service';
import configuration from '../throttler/throttler.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        RATE_LIMITER_TTL: Joi.number().required(),
        RATE_LIMITER_LIMIT: Joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService, ThrottlerConfigService],
  exports: [ConfigService, ThrottlerConfigService],
})
export default class ThrottlerConfigModule {}
