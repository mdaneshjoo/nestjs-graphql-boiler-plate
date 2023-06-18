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
import { CacheModule } from '@nestjs/cache-manager';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import ShareModule from './app/share/share.module';
import UserModule from './app/user/user.module';
import AuthModule from './app/auth/auth.module';
import RolesModule from './app/roles/roles.module';
import PrivilegesModule from './app/commands/privileges.module';
import RedisConfigService from './config/database/redis/redis.config.service';

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
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useClass: RedisConfigService,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        tr: 'tr',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
      typesOutputPath: path.join(
        __dirname,
        '../src/generated/i18n.generated.ts',
      ),
    }),
    // endregion

    ...CustomConfigModule,

    AuthModule,
    UserModule,
    ShareModule,
    RolesModule,
    PrivilegesModule,
  ],
})
// we can export default because of PrivilegesModule (cli file read this class)
// eslint-disable-next-line import/prefer-default-export
export class AppModule {}
