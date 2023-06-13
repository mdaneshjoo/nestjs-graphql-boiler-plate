import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RolesResolver from './roles.resolver';
import RolesService from './roles.service';
import Roles from './entities/roles.entity';
import UserPermissions from './entities/permissions.entity';
import PermissionsRepository from './repositories/permissions.repository';
import RolesRepository from './repositories/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, UserPermissions])],
  providers: [
    RolesService,
    PermissionsRepository,
    RolesRepository,
    RolesResolver,
  ],
  exports: [RolesService, RolesRepository, PermissionsRepository],
})
export default class RolesModule {}
