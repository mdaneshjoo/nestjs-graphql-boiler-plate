import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int } from '@nestjs/graphql';

export default class CommonEntity {
  @Field(() => Int, { description: 'User id' })
  @PrimaryGeneratedColumn()
  id?: number;

  @Field({ description: 'user password' })
  @CreateDateColumn()
  createdAt?: Date;

  @Field({ description: 'user password' })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Field({ description: 'user password' })
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
