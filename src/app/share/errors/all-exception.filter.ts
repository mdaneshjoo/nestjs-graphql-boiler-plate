import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { AppConfigService } from '@config';
import { I18nContext } from 'nestjs-i18n';
import { I18nPath, I18nTranslations } from '../../../generated/i18n.generated';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly appConfigService: AppConfigService) {}

  public catch(
    exception: HttpException & {
      args: unknown;
      needTranslate: boolean;
    },
    host: ArgumentsHost,
  ): HttpException {
    const gqlHost = GqlArgumentsHost.create(host);
    const i18n = I18nContext.current<I18nTranslations>(gqlHost);
    if (this.appConfigService.NODE_ENV === 'PROD') {
      if (!Reflect.has(exception, 'getStatus')) {
        const message = 'errors.WENT_WRONG';
        // eslint-disable-next-line no-param-reassign
        exception.message = i18n.t(message as I18nPath);
      }
      return exception;
    }
    if (exception?.needTranslate) {
      // eslint-disable-next-line no-param-reassign
      exception.message = i18n.t(exception.message as I18nPath, {
        args: exception.args,
      });
    }

    return exception;
  }
}
