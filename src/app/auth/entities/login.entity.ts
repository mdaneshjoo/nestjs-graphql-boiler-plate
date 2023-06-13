import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Login {
  @Field({ description: 'logged-in user jwt access token' })
  access_token: string;
}
