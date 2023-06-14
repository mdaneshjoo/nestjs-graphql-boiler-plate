import { registerAs } from '@nestjs/config';

export default registerAs('PG', () => ({
  HOST: process.env.POSTGRES_HOST,
  PORT: process.env.POSTGRES_PORT,
  USERNAME: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  NAME: process.env.POSTGRES_DATABASE,
}));
