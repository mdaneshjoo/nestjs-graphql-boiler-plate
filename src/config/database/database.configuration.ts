import { registerAs } from '@nestjs/config';

export default registerAs('DB', () => ({
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME,
  SYNC: process.env.DB_SYNC_MODELS,
}));
