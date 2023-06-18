import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '@config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { IS_PUBLIC_KEY } from '../../share/decorators/public-endpoint.decorator';
import { JwtPayload } from '../interfaces/auth.types';
import UnauthorizedI18nException from '../../share/errors/custom-errors/unauthorized.i18n.exception';

@Injectable()
export default class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || false;
    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(this.getRequest(context));
    if (!token) throw new UnauthorizedI18nException('errors.FORCE_LOGGED_OUT');
    const decodedPayload: JwtPayload = this.jwtService.verify(token, {
      secret: this.jwtConfigService.SECRET,
    });
    if (!decodedPayload) {
      throw new UnauthorizedI18nException('errors.FORCE_LOGGED_OUT');
    }

    const fetchedToken = await this.cacheManager.get<string>(
      decodedPayload.id.toString(),
    );
    if (!fetchedToken) {
      throw new UnauthorizedI18nException('errors.FORCE_LOGGED_OUT');
    }
    if (fetchedToken !== token) {
      throw new UnauthorizedI18nException('errors.FORCE_LOGGED_OUT');
    }
    this.getRequest(context).user = decodedPayload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
