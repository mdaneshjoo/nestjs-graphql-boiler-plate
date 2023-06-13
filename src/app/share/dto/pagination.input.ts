import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export default class PaginationInput {
  @IsOptional()
  @Field(() => Int, {
    defaultValue: 10,
    nullable: true,
    description: 'default is 10 ( first 10 field )',
  })
  first?: number;

  @IsOptional()
  @Field(() => Int, {
    defaultValue: 0,
    nullable: true,
    description: 'default is 0 ( start from field 0 )',
  })
  after?: number;
}
