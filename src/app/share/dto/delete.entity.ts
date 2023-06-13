import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Delete {
  @Field(() => ID, { description: 'deleted item id' })
  id: number;
}
