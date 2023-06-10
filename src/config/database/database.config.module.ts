import { Module } from '@nestjs/common';
import PostgresConfigModule from './postgres/postgres.config.module';

@Module({
  imports: [PostgresConfigModule],
})
export default class DatabaseConfigModule {}
