import { registerAs } from '@nestjs/config';

export default registerAs('JWT', () => ({
  SECRET: process.env.JWT_SECRET,
}));
