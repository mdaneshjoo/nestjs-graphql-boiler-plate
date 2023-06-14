import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import RedisConfigService from './redis.config.service';
import configuration from './redis.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService, RedisConfigService],
  exports: [RedisConfigService],
})
export default class RedisConfigModule {}
