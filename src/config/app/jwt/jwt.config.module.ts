import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppConfigModule, AppConfigService } from '@config';
import JwtConfigService from './jwt.config.service';
import configuration from './jwt.configuration';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
    }),
  ],
  providers: [JwtConfigService, ConfigService, AppConfigService],
  exports: [JwtConfigService, ConfigService],
})
export default class JwtConfigModule {}
