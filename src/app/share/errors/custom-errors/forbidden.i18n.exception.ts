import { ForbiddenException } from '@nestjs/common';
import { I18nPath } from '../../../../generated/i18n.generated';

export default class ForbiddenI18nException extends ForbiddenException {
  constructor(key: I18nPath, private readonly _args?: unknown) {
    super(key);
  }

  get translation(): I18nPath {
    return this.message as I18nPath;
  }

  get needTranslate(): boolean {
    return true;
  }

  get args(): unknown {
    return this._args;
  }
}
