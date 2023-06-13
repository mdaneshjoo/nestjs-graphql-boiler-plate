import { Column, Entity } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import CommonEntity from '../../share/entities/common.entity';

@InputType('PermissionsInputType')
@ObjectType('PermissionsType')
@Entity({ name: 'permissions' })
export default class UserPermissions extends CommonEntity {
  @Field({ description: 'user email' })
  @Column({ unique: true })
  permissionName?: string;

  @Field({ description: 'user email' })
  @Column({ nullable: true })
  description?: string;
}
