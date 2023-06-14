import { registerAs } from '@nestjs/config';

export default registerAs('REDIS', () => ({
  HOST: process.env.REDIS_HOST,
  PORT: process.env.REDIS_PORT,
}));
