/* eslint-disable import/prefer-default-export */
export enum PermissionsEnum {
  // important don't remove MANAGE permission
  MANAGE = 'manage',
  CREATE_USER = 'create-user',
  GET_ALL_ROLES = 'get-all-roles',
  GET_ALL_PERMISSIONS = 'get-all-permissions',
  GET_ROLE = 'get-role',
  CREATE_ROLE = 'create-role',
  UPDATE_ROLE_PERMISSIONS = 'update-role-permissions',
  UPDATE_ROLE = 'update-role',
  DELETE_ROLE = 'delete-role',
  CHANGE_USERS_PASSWORD = 'change-users-password',
}

export enum PermissionsDescriptionEnum {
  MANAGE = 'can access any where',
  CREATE_USER = 'can create user',
}

export const getPermissionsDescription = (
  permissionEnumValue: string,
): string =>
  PermissionsDescriptionEnum[
    Object.keys(PermissionsDescriptionEnum)[
      Object.values(PermissionsEnum).indexOf(permissionEnumValue as never)
    ] as never
  ];
