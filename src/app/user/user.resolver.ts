import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import UserService from './user.service';
import CreateUserInput from './dto/create-user.input';
import User from './entities/user.entity';
import { PermissionsEnum } from '../roles/permissions.enum';
import { RequirePermissions } from '../share/decorators/permission-api.decorator';
import RolesRepository from '../roles/repositories/roles.repository';
import CurrentUser from '../share/decorators/current-user.decorator';
import { JwtPayload } from '../auth/auth.types';

@Resolver(() => User)
export default class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly roleRepository: RolesRepository,
  ) {}

  @RequirePermissions(PermissionsEnum.CREATE_USER)
  @Mutation(() => User)
  createUser(
    @CurrentUser() user: JwtPayload,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.userService.create({
      email: createUserInput.email,
      password: createUserInput.password,
      role: this.roleRepository.create(createUserInput.rolesId),
    });
  }

  @Query(() => User)
  async me(@CurrentUser() currentUser: JwtPayload): Promise<User> {
    return this.userService.findOneById(currentUser.id);
  }

  uploadAvatar() {
    return 'upload';
  }

  updateProfile() {
    return 'upload';
  }

  // TODO remove token from redis
  delete() {
    return 'upload';
  }

  // TODO expire user token
  changeUserRole() {
    return 'upload';
  }
}
