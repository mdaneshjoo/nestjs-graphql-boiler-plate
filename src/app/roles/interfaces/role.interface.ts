import Roles from '../entities/roles.entity';
import { AtLeast } from '../../share/interface';

export interface RoleFilterParam {
  take?: number;
  skip?: number;
  order?: never;
  search?: string;
}

export type UpdateRoleParam = AtLeast<Roles, 'id'>;
