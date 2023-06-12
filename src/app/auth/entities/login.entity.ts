import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Login {
  @Field({ description: 'user password' })
  access_token: string;
}
