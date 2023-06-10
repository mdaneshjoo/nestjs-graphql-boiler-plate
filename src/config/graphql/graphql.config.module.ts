import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import GraphqlConfigService from './graphql.config.service';
import AppConfigService from '../app/app.config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigService, GraphqlConfigService, AppConfigService],
  exports: [ConfigService, GraphqlConfigService],
})
export default class GraphqlConfigModule {}
