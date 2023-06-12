import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import UserService from './user.service';
import CreateUserInput from './dto/create-user.input';
import User from './entities/user.entity';

@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create({
      email: createUserInput.email,
      password: createUserInput.password,
    });
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('email') email: string): Promise<User> {
    return this.userService.findOne(email);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
