import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { PostgresConfigService } from '@config';

config();
// based on https://wanago.io/2022/07/25/api-nestjs-database-migrations-typeorm/
const configService = new ConfigService();

const postgresConfigService = new PostgresConfigService(configService);

export default new DataSource({
  type: 'postgres',
  host: postgresConfigService.HOST,
  port: postgresConfigService.PORT,
  username: postgresConfigService.USERNAME,
  password: postgresConfigService.PASSWORD,
  database: postgresConfigService.NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
});
