import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export default class CreateAuthInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
