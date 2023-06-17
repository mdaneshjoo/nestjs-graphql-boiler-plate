import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from '@config';
import { APP_GUARD } from '@nestjs/core';
import AuthService from './auth.service';
import AuthResolver from './auth.resolver';
import JwtConfigModule from '../../config/app/jwt/jwt.config.module';
import JwtConfigService from '../../config/app/jwt/jwt.config.service';
import UserModule from '../user/user.module';
import JwtAuthGuard from './guards/gql-jwt-auth.guard';
import PermissionsGuard from './guards/permission.guard';

@Module({
  imports: [
    JwtConfigModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, AppConfigModule],
      useClass: JwtConfigService,
    }),
    UserModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [AuthService],
})
export default class AuthModule {}
