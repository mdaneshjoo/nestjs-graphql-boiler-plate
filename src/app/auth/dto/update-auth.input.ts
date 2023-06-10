import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import CreateAuthInput from './create-auth.input';

@InputType()
export default class UpdateAuthInput extends PartialType(CreateAuthInput) {
  @Field(() => Int)
  id: number;
}
