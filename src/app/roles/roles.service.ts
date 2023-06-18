import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import RolesRepository from './repositories/roles.repository';
import PermissionsRepository from './repositories/permissions.repository';
import Roles from './entities/roles.entity';
import UserPermissions from './entities/permissions.entity';
import { FindOrCreateResult } from '../share/interface';
import { getPermissionsDescription } from './permissions.enum';
import { RoleFilterParam, UpdateRoleParam } from './interfaces/role.interface';
import { PermissionFilterParams } from './interfaces/permissions.interface';
import NotFoundI18nException from '../share/errors/custom-errors/not-found.i18n.exception';
import BadRequestI18nException from '../share/errors/custom-errors/bad-request.i18n.exception';

@Injectable()
export default class RolesService {
  constructor(
    private readonly roleRepository: RolesRepository,
    private readonly permissionRepository: PermissionsRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  /**
   * @desc if role not exist created it else return exist role
   * */
  async findOrCreateRole(role: Roles): Promise<Roles> {
    const { result: createdRole } = await this.roleRepository.findOrCreate(
      { name: role.name },
      role,
    );
    return createdRole;
  }

  /**
   * @desc find  roles by its name without relation
   * */
  async findByName(names: string[]): Promise<Roles[]> {
    return this.roleRepository.find({
      where: { name: In(names) },
    });
  }

  async createPermissions(
    permission: UserPermissions,
  ): Promise<FindOrCreateResult<UserPermissions>> {
    return this.permissionRepository.findOrCreate(
      {
        name: permission.name,
      },
      permission,
    );
  }

  /**
   * @desc if permission not exist will create it else return exist permission
   * */

  async createRoleAndPermissions(roleData: Roles) {
    const permissions = await Promise.all(
      roleData.permissions.map(async (perm) => {
        const { result } = await this.createPermissions({
          name: perm.name,
          description: getPermissionsDescription(perm.description),
        });
        return result;
      }),
    );
    const { result: role } = await this.roleRepository.findOrCreate(
      { name: roleData.name },
      roleData,
    );

    role.permissions = permissions;
    return this.roleRepository.save(role);
  }

  async getAllRoles(roleFilterData: RoleFilterParam): Promise<Roles[]> {
    return this.roleRepository.find({
      take: roleFilterData.take || 10,
      skip: roleFilterData.skip || 0,
      relations: { permissions: true },
    });
  }

  async getAllPermissions(
    permissionFilterData: PermissionFilterParams,
  ): Promise<UserPermissions[]> {
    return this.permissionRepository.find({
      take: permissionFilterData.take || 10,
      skip: permissionFilterData.skip || 0,
    });
  }

  async updateRolePermissions(updateRole: UpdateRoleParam): Promise<Roles> {
    const role = await this.roleRepository.findOne({
      where: { id: updateRole.id },
      relations: { permissions: true, users: true },
    });

    if (!role) {
      throw new NotFoundI18nException('errors.NOT_FOUND', { item: 'roles' });
    }
    const foundPermissions = await this.permissionRepository.find({
      where: { id: In(updateRole.permissions.map((_perm) => _perm.id)) },
    });
    if (!foundPermissions.length) {
      throw new NotFoundI18nException('errors.NOT_FOUND', {
        item: 'permission',
      });
    }
    role.permissions = foundPermissions;
    const savedRoles = await this.roleRepository.save(role);
    const roleUsersIds = role.users.map((user) => user.id.toString());
    this.cacheManager.store.mdel(...roleUsersIds);
    return savedRoles;
  }

  async delete(roleId: number): Promise<number> {
    const { affected } = await this.roleRepository
      .createQueryBuilder()
      .softDelete()
      .where('id=:id', { id: roleId })
      .execute();
    if (!affected) {
      throw new BadRequestI18nException('errors.UNABLE_DELETE', {
        deleteItem: 'role',
      });
    }
    return roleId;
  }
}
