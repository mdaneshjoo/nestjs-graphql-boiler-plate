import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import IdDto from '../../share/dto/id.dto';

@InputType()
export default class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  @Field({ description: 'user email address' })
  email: string;

  @IsNotEmpty()
  @Field({ description: 'user password' })
  password: string;

  @IsNotEmpty()
  @Field(() => [IdDto], { description: 'user password' })
  rolesId: IdDto[];
}
