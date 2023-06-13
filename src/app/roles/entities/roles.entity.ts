import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import CommonEntity from '../../share/entities/common.entity';
import UserPermissions from './permissions.entity';

@ObjectType()
@Entity({ name: 'roles' })
export default class Roles extends CommonEntity {
  @Field({ description: 'role name' })
  @Column({ unique: true, nullable: false })
  name: string;

  @Field({ description: 'role description', nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [UserPermissions], {
    description: 'role permissions',
    nullable: true,
  })
  @ManyToMany(() => UserPermissions)
  @JoinTable()
  permissions: UserPermissions[];
}
