import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import Roles from './entities/roles.entity';
import RolesService from './roles.service';
import GetRoleInput from './dto/get-role.input';
import CreateRoleInput from './dto/create-role.input';
import UpdateRolePermissionInput from './dto/update-role-permission.input';
import UpdateRoleInput from './dto/update-role.input';
import UserPermissions from './entities/permissions.entity';
import RolesRepository from './repositories/roles.repository';
import PermissionsRepository from './repositories/permissions.repository';
import GetAllRolesInput from './dto/get-all-roles.input';
import GetAllPermissionsInput from './dto/get-all-permissions.Input';
import Delete from '../share/dto/delete.entity';
import CurrentUser from '../share/decorators/current-user.decorator';
import { JwtPayload } from '../auth/interfaces/auth.types';
import { RequirePermissions } from '../share/decorators/permission-api.decorator';
import { PermissionsEnum } from './permissions.enum';

@Resolver(() => Roles)
export default class RolesResolver {
  constructor(
    private readonly rolesService: RolesService,
    private readonly rolesRepository: RolesRepository,
    private readonly permissionRepository: PermissionsRepository,
  ) {}

  @RequirePermissions(PermissionsEnum.GET_ALL_ROLES)
  @Query(() => [Roles])
  async getAllRoles(
    @Args('getAllRolesInput') getAllRolesInput: GetAllRolesInput,
  ): Promise<Roles[]> {
    return this.rolesService.getAllRoles({
      take: getAllRolesInput.first,
      skip: getAllRolesInput.after,
    });
  }

  @RequirePermissions(PermissionsEnum.GET_ALL_PERMISSIONS)
  @Query(() => [UserPermissions])
  async getAllPermissions(
    @Args('getAllPermissionsInput')
    getAllPermissionsInput: GetAllPermissionsInput,
  ): Promise<UserPermissions[]> {
    return this.rolesService.getAllPermissions({
      take: getAllPermissionsInput.first,
      skip: getAllPermissionsInput.after,
    });
  }

  @RequirePermissions(PermissionsEnum.GET_ROLE)
  @Query(() => Roles, { description: 'not ready yet' })
  async getRole(@Args('getRoleInput') getRoleInput: GetRoleInput) {
    return Promise.resolve('role');
  }

  @RequirePermissions(PermissionsEnum.CREATE_ROLE)
  @Mutation(() => Roles)
  async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.findOrCreateRole(
      this.rolesRepository.create({
        ...createRoleInput,
        permissions: this.permissionRepository.create(
          createRoleInput.permissionIds,
        ),
      }),
    );
  }

  @RequirePermissions(PermissionsEnum.UPDATE_ROLE_PERMISSIONS)
  @Mutation(() => Roles)
  async updateRolePermissions(
    @Args('updateRolePermissionInput')
    updateRolePermissionInput: UpdateRolePermissionInput,
  ): Promise<Roles> {
    return this.rolesService.updateRolePermissions({
      id: updateRolePermissionInput.id,
      permissions: updateRolePermissionInput.permissionIds,
    });
  }

  @RequirePermissions(PermissionsEnum.UPDATE_ROLE)
  @Mutation(() => Roles, { description: 'not ready yet' })
  async updateRole(@Args('updateRole') updateRole: UpdateRoleInput) {
    return Promise.resolve('update');
  }

  @RequirePermissions(PermissionsEnum.DELETE_ROLE)
  @Mutation(() => Delete)
  async deleteRole(
    @CurrentUser() user: JwtPayload,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Delete> {
    const deletedId = await this.rolesService.delete(id);
    return { id: deletedId };
  }
}
