import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { validate } from 'class-validator';
import LoginInput from '../dto/login.Input';
import AuthService from '../auth.service';
import UnauthorizedI18nException from '../../share/errors/custom-errors/unauthorized.i18n.exception';

@Injectable()
export default class LocalAuthGuard {
  constructor(private readonly authService: AuthService) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const { loginInput } = ctx.getArgs();
    request.body = loginInput;
    return request;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const loginInput = new LoginInput();
    Object.assign(loginInput, ctx.getArgs().loginInput);

    const errors = await validate(loginInput, { stopAtFirstError: true });
    if (errors.length) {
      const firstError =
        errors[0].constraints[Object.keys(errors[0].constraints)[0]];
      throw new BadRequestException(firstError);
    }
    const user = await this.authService.validate(
      loginInput.email,
      loginInput.password,
    );
    if (!user) {
      throw new UnauthorizedI18nException('errors.INVALID_EMAIL_PASSWORD');
    }
    this.getRequest(context).user = user;
    return true;
  }
}
