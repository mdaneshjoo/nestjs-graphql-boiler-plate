import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import CommonEntity from '../../share/entities/common.entity';
import Roles from '../../roles/entities/roles.entity';

@ObjectType()
@Entity({ name: 'users' })
export default class User extends CommonEntity {
  @Field({ description: 'user email' })
  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Field({ description: 'user firstName and lastName', nullable: true })
  @Column({ nullable: true })
  name?: string;

  /**
   * @desc this use for auto generated passwords if its ture user should change password
   * */
  @Column({ default: false })
  needChangePassword?: boolean;

  @Field(() => [Roles], { description: 'user email' })
  @ManyToMany(() => Roles)
  @JoinTable()
  role: Roles[];

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
