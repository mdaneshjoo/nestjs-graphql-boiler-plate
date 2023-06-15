import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export default class UserChangePasswordInput {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => ID, { description: 'user id to change password' })
  userId: string;

  @IsNotEmpty()
  @Field({ description: 'user new password' })
  password: string;
}
