import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserService from '../user/user.service';
import User from '../user/entities/user.entity';
import JwtConfigService from '../../config/app/jwt/jwt.config.service';
import { JwtPayload } from './auth.types';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return user;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.jwtConfigService.EXPIRE,
      }),
    };
  }
}
