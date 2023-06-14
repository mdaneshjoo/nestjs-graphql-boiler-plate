import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import CommonEntity from '../../share/entities/common.entity';
import Roles from './roles.entity';

@ObjectType('PermissionsType')
@Entity({ name: 'permissions' })
export default class UserPermissions extends CommonEntity {
  @Field({ description: 'user email' })
  @Column({ unique: true })
  permissionName?: string;

  @Field({ description: 'user email' })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [Roles], {
    description: 'permission roles',
    nullable: true,
  })
  @ManyToMany(() => Roles, (roles) => roles.permissions)
  roles?: Roles[];
}
