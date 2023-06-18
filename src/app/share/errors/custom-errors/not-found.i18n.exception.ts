import { NotFoundException } from '@nestjs/common';
import { I18nPath } from '../../../../generated/i18n.generated';

export default class NotFoundI18nException extends NotFoundException {
  constructor(key: I18nPath | string, private readonly _args?: unknown) {
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
