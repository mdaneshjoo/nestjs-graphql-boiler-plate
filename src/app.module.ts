import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  AppConfigModule,
  CustomConfigModule,
  DatabaseConfigModule,
  DatabaseConfigService,
  GraphqlConfigService,
  ThrottlerConfigService,
} from '@config';
import AuthModule from './app/auth/auth.module';
import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    // region Third party modules
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AppConfigModule],
      useClass: GraphqlConfigService,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfigService,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useClass: DatabaseConfigService,
    }),
    // endregion

    ...CustomConfigModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {
}
