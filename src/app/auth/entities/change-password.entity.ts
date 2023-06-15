import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class ChangePassword {
  @Field({ description: 'if true password changed' })
  isPasswordChanged: boolean;
}
