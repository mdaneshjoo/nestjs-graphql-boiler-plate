import { IsNotEmpty } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export default class IdDto {
  @IsNotEmpty()
  @Field(() => ID, { description: 'user password' })
  id: number;
}
