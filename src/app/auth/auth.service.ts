import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AppConfigService } from '@config';
import UserService from '../user/user.service';
import User from '../user/entities/user.entity';
import JwtConfigService from '../../config/app/jwt/jwt.config.service';
import { JwtPayload, PayloadRole } from './interfaces/auth.types';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly appConfigService: AppConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return user;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const role = user.roles.map((roles) => {
      const permissions = roles.permissions.map(({ name, id }) => ({
        id,
        name,
      }));
      return { id: roles.id, roleName: roles.name, permissions };
    }) as PayloadRole;
    const payload: JwtPayload = { id: user.id, email: user.email, role };
    const accessToken = await this.jwtService.signAsync(payload);
    await this.cacheManager.set(
      user.id.toString(),
      accessToken,
      this.appConfigService.NODE_ENV === 'DEV'
        ? 0
        : this.appConfigService.TOKEN_EXPIRE,
    );
    return {
      access_token: accessToken,
    };
  }

  getUserPermissions(user: JwtPayload): string[] {
    const permissions = new Set<string>();
    if (user && user.role.length) {
      user.role.forEach((role) => {
        if (role.permissions && role.permissions.length) {
          role.permissions.map((perm) => permissions.add(perm.name));
        }
      });
    }
    return [...permissions];
  }

  async logout(id: number): Promise<void> {
    await this.cacheManager.del(id.toString());
  }
}
