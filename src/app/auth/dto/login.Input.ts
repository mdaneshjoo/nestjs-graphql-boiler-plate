import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export default class LoginInput {
  @IsEmail()
  @IsNotEmpty()
  @Field({ description: 'user email address' })
  email: string;

  @IsNotEmpty()
  @Field({ description: 'user password' })
  password: string;
}
