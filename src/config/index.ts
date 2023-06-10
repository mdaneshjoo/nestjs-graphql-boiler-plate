import AppConfigModule from './app/app.config.module';
import DatabaseConfigModule from './database/database.config.module';
import GraphqlConfigModule from './graphql/graphql.config.module';
import ThrottlerConfigModule from './throttler/throttler.config.module';
import DatabaseConfigService from './database/database.config.service';
import GraphqlConfigService from './graphql/graphql.config.service';
import ThrottlerConfigService from './throttler/throttler.config.service';
import AppConfigService from './app/app.config.service';

/**
 * @description all config module should import in this array
 * */
export const CustomConfigModule = [
  AppConfigModule,
  DatabaseConfigModule,
  GraphqlConfigModule,
  ThrottlerConfigModule,
];

// region Config Module Group
export {
  AppConfigModule,
  AppConfigService,
  DatabaseConfigModule,
  DatabaseConfigService,
  GraphqlConfigService,
  ThrottlerConfigService,
};
// endregion
