import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Logout {
  @Field({ description: 'if true jwt expired' })
  isLoggedOut: boolean;
}
