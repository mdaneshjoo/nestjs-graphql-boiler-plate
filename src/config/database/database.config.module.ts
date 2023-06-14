import { Module } from '@nestjs/common';
import RedisConfigModule from './redis/redis.config.module';
import PostgresConfigModule from './postgres/postgres.config.module';

@Module({
  imports: [PostgresConfigModule, RedisConfigModule],
})
export default class DatabaseConfigModule {}
