import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export default class UpdateRoleInput {
  @IsNotEmpty()
  @Field({ description: 'role name' })
  name: string;

  @IsOptional()
  @Field({ description: 'role description', nullable: true })
  description?: string;
}
