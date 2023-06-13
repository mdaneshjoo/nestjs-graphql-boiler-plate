import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class CommonEntity {
  @Field(() => ID, { description: 'User id' })
  @PrimaryGeneratedColumn()
  id?: number;

  @Field({ description: 'user password' })
  @CreateDateColumn()
  createdAt?: Date;

  @Field({ description: 'user password' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
