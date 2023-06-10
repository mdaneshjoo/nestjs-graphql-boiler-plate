import { registerAs } from '@nestjs/config';

export default registerAs('App', () => ({
  PORT: process.env.PORT,
  MODE: process.env.MODE,
}));
