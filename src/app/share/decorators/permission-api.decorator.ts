import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from '../../roles/permissions.enum';

export const PERMISSION_KEY = 'permissions';

export const RequirePermissions = (...permissions: PermissionsEnum[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
