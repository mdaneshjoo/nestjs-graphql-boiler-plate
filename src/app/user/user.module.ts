import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserService from './user.service';
import UserResolver from './user.resolver';
import RolesModule from '../roles/roles.module';
import User from './entities/user.entity';
import RolesRepository from '../roles/repositories/roles.repository';
import UserRepository from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  providers: [UserResolver, UserService, RolesRepository, UserRepository],
  exports: [UserService, UserRepository],
})
export default class UserModule {}
