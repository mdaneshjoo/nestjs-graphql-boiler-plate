/* eslint-disable import/prefer-default-export */

import { applyDecorators, UseGuards } from '@nestjs/common';
import LocalAuthGuard from './guards/gql-local-auth.guard';
import GqlThrottlerGuard from './guards/gql-throttler.guard';
import { Public } from '../share/decorators/public-endpoint.decorator';

export function LoginDec() {
  return applyDecorators(
    UseGuards(LocalAuthGuard, GqlThrottlerGuard),
    Public(),
  );
}
