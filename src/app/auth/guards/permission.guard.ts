import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PermissionsEnum } from '../../roles/permissions.enum';
import AuthService from '../auth.service';
import { PERMISSION_KEY } from '../../share/decorators/permission-api.decorator';
import { JwtPayload } from '../interfaces/auth.types';
import ForbiddenI18nException from '../../share/errors/custom-errors/forbidden.i18n.exception';

@Injectable()
export default class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionsEnum[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }
    const user = this.getRequest(context).user as JwtPayload;
    const permissions = this.authService.getUserPermissions(user);
    if (permissions.includes(PermissionsEnum.MANAGE)) return true;
    const haveAccess = requiredPermissions.some((permission) =>
      permissions?.includes(permission),
    );
    if (!haveAccess) throw new ForbiddenI18nException('errors.LIMITED_ACCESS');
    return true;
  }
}
