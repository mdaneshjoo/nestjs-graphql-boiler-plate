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
  PostgresConfigService,
  ThrottlerConfigService,
} from '@config';
import ShareModule from './app/share/share.module';
import UserModule from './app/user/user.module';
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
      imports: [ConfigModule],
      useClass: PostgresConfigService,
    }),
    // endregion

    ...CustomConfigModule,

    AuthModule,
    UserModule,
    ShareModule,
  ],
})
export default class AppModule {}
