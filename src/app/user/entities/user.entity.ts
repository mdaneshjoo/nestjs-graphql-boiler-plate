import { BeforeInsert, Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import CommonEntity from '../../share/entities/common.entity';

@ObjectType()
@Entity({ name: 'users' })
export default class User extends CommonEntity {
  @Field({ description: 'user email' })
  @Column()
  email: string;

  @Exclude()
  @Field({ description: 'user password' })
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
