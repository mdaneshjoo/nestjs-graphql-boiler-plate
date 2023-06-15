import { Args, Mutation, Resolver } from '@nestjs/graphql';
import AuthService from './auth.service';
import LoginInput from './dto/login.Input';
import User from '../user/entities/user.entity';
import Login from './entities/login.entity';
import CurrentUser from '../share/decorators/current-user.decorator';
import Logout from './entities/logout.entity';
import { LoginDec } from './auth.decorator';
import ChangePassword from './entities/change-password.entity';
import UserChangePasswordInput from './dto/user-change-password.input';
import { RequirePermissions } from '../share/decorators/permission-api.decorator';
import { PermissionsEnum } from '../roles/permissions.enum';

@Resolver(() => User)
export default class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @LoginDec()
  @Mutation(() => Login)
  login(
    @CurrentUser() user: User,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<Login> {
    return this.authService.login(user);
  }

  @Mutation(() => Logout, { description: 'logout user' })
  async logout(@CurrentUser() user: User): Promise<Logout> {
    await this.authService.logout(user.id);
    return { isLoggedOut: true };
  }

  @RequirePermissions(PermissionsEnum.CHANGE_USERS_PASSWORD)
  @Mutation(() => ChangePassword, {
    description: 'change users password by admin',
  })
  async changePasswordByAdmin(
    @Args('userChangePasswordInput')
    userChangePasswordInput: UserChangePasswordInput,
  ): Promise<ChangePassword> {
    // this.authService.changePassword();
    return { isPasswordChanged: false };
  }
}
