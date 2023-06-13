import { Field, ID, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import IdDto from '../../share/dto/id.dto';

@InputType()
export default class UpdateRolePermissionInput {
  @IsNotEmpty()
  @Field(() => ID, { description: 'role id to update' })
  id: number;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @Field(() => [IdDto], { description: 'permission ids to assign to the role' })
  permissionIds: IdDto[];
}
