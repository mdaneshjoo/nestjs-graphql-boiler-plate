/* eslint-disable import/prefer-default-export */

import { PermissionsEnum } from './permissions.enum';
import Roles from './entities/roles.entity';

interface RoleMap {
  [roleName: string]: Pick<Roles, 'name' | 'description'> & {
    permissions: Array<Pick<Roles['permissions'][0], 'name'>>;
  };
}

export const ConstRoles: RoleMap = {
  // Important don't remove SuperAdmin role
  SuperAdmin: {
    name: 'super admin',
    description: 'this is super admin role and can access to any thing',
    permissions: [{ name: PermissionsEnum.MANAGE }],
  },
  CompanyAdmin: {
    name: 'company admin',
    description:
      'this is company admin role and can do any thing related to company',
    permissions: [{ name: PermissionsEnum.CREATE_USER }],
  },
};
