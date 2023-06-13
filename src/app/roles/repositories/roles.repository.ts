import {
  DataSource,
  DeepPartial,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import Roles from '../entities/roles.entity';
import { FindOrCreateResult } from '../../share/interface';
import PermissionsRepository from './permissions.repository';

@Injectable()
export default class RolesRepository extends Repository<Roles> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly permissionRepository: PermissionsRepository,
  ) {
    super(Roles, dataSource.createEntityManager());
  }

  async findOrCreate(
    criteria: FindOptionsWhere<Roles>,
    role: DeepPartial<Roles>,
  ): Promise<FindOrCreateResult<Roles>> {
    const foundRole = await this.findOne({
      where: criteria,
      relations: { permissions: true },
    });
    if (foundRole) return { created: false, result: foundRole };
    const createdRole = await this.insertReturning(role);
    return { created: true, result: createdRole };
  }

  async insertReturning(role: DeepPartial<Roles>): Promise<Roles> {
    const newRoleInstance = this.create(role);
    if (newRoleInstance.permissions && newRoleInstance.permissions.length) {
      const permissions = await this.permissionRepository.find({
        where: { id: In(newRoleInstance.permissions.map((_perm) => _perm.id)) },
      });
      if (!permissions.length) throw new Error("permission doesn't exist");
      newRoleInstance.permissions = permissions;
    }
    return this.save(newRoleInstance);
  }
}
