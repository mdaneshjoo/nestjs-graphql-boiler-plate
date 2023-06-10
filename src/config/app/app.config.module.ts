import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import AppConfigService from './app.config.service';
import configuration from './app.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MODE: Joi.string().valid('DEV', 'PROD').required(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export default class AppConfigModule {}
