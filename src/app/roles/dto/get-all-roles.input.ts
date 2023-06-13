import { InputType } from '@nestjs/graphql';
import PaginationInput from '../../share/dto/pagination.input';

@InputType()
export default class GetAllRolesInput extends PaginationInput {}
