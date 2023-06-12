import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from '@config';
import { APP_GUARD } from '@nestjs/core';
import AuthService from './auth.service';
import AuthResolver from './auth.resolver';
import JwtConfigModule from '../../config/app/jwt/jwt.config.module';
import JwtConfigService from '../../config/app/jwt/jwt.config.service';
import LocalStrategy from './strategies/local-strategy';
import JwtStrategy from './strategies/jwt-strategy';
import UserModule from '../user/user.module';
import JwtAuthGuard from './guards/gql-jwt-auth.guard';

@Module({
  imports: [
    JwtConfigModule,
    PassportModule,
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
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export default class AuthModule {}
