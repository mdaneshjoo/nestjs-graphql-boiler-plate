import AppConfigModule from './app/app.config.module';
import DatabaseConfigModule from './database/database.config.module';
import GraphqlConfigModule from './graphql/graphql.config.module';
import ThrottlerConfigModule from './throttler/throttler.config.module';
import PostgresConfigService from './database/postgres/postgres.config.service';
import GraphqlConfigService from './graphql/graphql.config.service';
import ThrottlerConfigService from './throttler/throttler.config.service';
import AppConfigService from './app/app.config.service';
import PostgresConfigModule from './database/postgres/postgres.config.module';
import JwtConfigModule from './app/jwt/jwt.config.module';
import JwtConfigService from './app/jwt/jwt.config.service';

/**
 * @description all config module should import in this array
 * */
export const CustomConfigModule = [
  AppConfigModule,
  DatabaseConfigModule,
  GraphqlConfigModule,
  ThrottlerConfigModule,
  JwtConfigModule,
];

// region Config Module Group
export {
  AppConfigModule,
  AppConfigService,
  DatabaseConfigModule,
  PostgresConfigModule,
  PostgresConfigService,
  GraphqlConfigService,
  ThrottlerConfigService,
  JwtConfigModule,
  JwtConfigService,
};
// endregion
