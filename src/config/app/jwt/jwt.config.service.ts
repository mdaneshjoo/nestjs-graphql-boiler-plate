import { Injectable } from '@nestjs/common';
import {
  JwtModuleOptions,
  JwtOptionsFactory,
} from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from '@config';

@Injectable()
export default class JwtConfigService implements JwtOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  get SECRET(): string {
    return this.configService.get('JWT.SECRET');
  }

  get EXPIRE(): string {
    return this.configService.get('JWT.EXPIRE');
  }

  get IGNORE_EXPIRE(): boolean {
    return this.appConfigService.NODE_ENV === 'DEV';
  }

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.SECRET,
      signOptions: { expiresIn: this.EXPIRE },
    };
  }
}
