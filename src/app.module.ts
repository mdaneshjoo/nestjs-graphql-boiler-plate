import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  AppConfigModule,
  CustomConfigModule,
  GraphqlConfigService,
  PostgresConfigModule,
  PostgresConfigService,
  ThrottlerConfigService,
} from '@config';
import AuthModule from './app/auth/auth.module';

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
      imports: [PostgresConfigModule],
      useClass: PostgresConfigService,
    }),
    // endregion

    ...CustomConfigModule,

    AuthModule,
  ],
})
export default class AppModule {}
