import { registerAs } from '@nestjs/config';

export default registerAs('RL', () => ({
  TTL: process.env.RATE_LIMITER_TTL,
  LIMIT: process.env.RATE_LIMITER_LIMIT,
}));
