import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import LoginInput from './dto/login.Input';
import User from '../user/entities/user.entity';
import LocalAuthGuard from './guards/gql-local-auth.guard';
import Login from './entities/login.entity';
import CurrentUser from '../share/decorators/current-user.decorator';
import { Public } from '../share/decorators/public-endpoint.decorator';

@Resolver(() => User)
export default class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Mutation(() => Login)
  login(
    @CurrentUser() user: User,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<Login> {
    return this.authService.login(user);
  }
}
