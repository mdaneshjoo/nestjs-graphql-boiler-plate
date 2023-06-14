import { registerAs } from '@nestjs/config';

export default registerAs('App', () => ({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  TOKEN_EXPIRE: process.env.TOKEN_EXPIRE,
}));
