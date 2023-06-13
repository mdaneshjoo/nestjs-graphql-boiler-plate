import { Module } from '@nestjs/common';
import { ConsoleModule } from '@squareboat/nest-console';
import UserModule from '../user/user.module';
import PrivilegesCommands from './privileges.command';
import RolesModule from '../roles/roles.module';
import RolesRepository from '../roles/repositories/roles.repository';

@Module({
  imports: [ConsoleModule, UserModule, RolesModule],
  providers: [PrivilegesCommands, RolesRepository],
})
export default class PrivilegesModule {}
