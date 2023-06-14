import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '@config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { IS_PUBLIC_KEY } from '../../share/decorators/public-endpoint.decorator';
import { JwtPayload } from '../auth.types';

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

    try {
      const token = this.extractTokenFromHeader(this.getRequest(context));
      if (!token) throw new Error('please provide valid token');
      const decodedPayload: JwtPayload = this.jwtService.verify(token, {
        secret: this.jwtConfigService.SECRET,
      });
      if (!decodedPayload) throw new Error('please provide valid token');

      const fetchedToken = await this.cacheManager.get<string>(
        decodedPayload.id.toString(),
      );
      if (!fetchedToken) throw new Error('please provide valid token');
      if (fetchedToken !== token) {
        throw new Error('your token has been expired');
      }
      this.getRequest(context).user = decodedPayload;
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
