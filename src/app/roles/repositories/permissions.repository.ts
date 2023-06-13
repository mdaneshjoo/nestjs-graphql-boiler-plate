import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Injectable } from '@nestjs/common';
import { FindOrCreateResult } from '../../share/interface';
import UserPermissions from '../entities/permissions.entity';

@Injectable()
export default class PermissionsRepository extends Repository<UserPermissions> {
  constructor(private dataSource: DataSource) {
    super(UserPermissions, dataSource.createEntityManager());
  }

  async findOrCreate(
    criteria:
      | FindOptionsWhere<UserPermissions>
      | FindOptionsWhere<UserPermissions>[],
    data:
      | QueryDeepPartialEntity<UserPermissions>
      | QueryDeepPartialEntity<UserPermissions>[],
  ): Promise<FindOrCreateResult<UserPermissions>> {
    const foundResult = await this.findOne({ where: criteria });
    if (foundResult) return { created: false, result: foundResult };
    const createdResult = await this.insertReturning<UserPermissions>(data);
    return { created: true, result: createdResult };
  }

  async insertReturning<T>(
    data: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
  ) {
    const created = await this.createQueryBuilder()
      .insert()
      .values(data)
      .returning('*')
      .execute();
    return this.create(created.generatedMaps[0]);
  }
}
