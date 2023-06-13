import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export default class GetRoleInput {
  @Field(() => ID, { nullable: false, description: 'role id' })
  id: number;
}
