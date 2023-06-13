import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import IdDto from '../../share/dto/id.dto';

@InputType()
export default class CreateRoleInput {
  @IsNotEmpty()
  @Field({ description: 'role name' })
  name: string;

  @IsOptional()
  @Field({ description: 'role description', nullable: true })
  description?: string;

  @IsOptional()
  @Field(() => [IdDto], {
    description: 'permission ids to assign to the role',
    nullable: true,
  })
  permissionIds: IdDto[];
}
