import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import User from './entities/user.entity';
import UserRepository from './repositories/user.repository';
import { UserInterface } from './interfaces/user.interface';
import RolesRepository from '../roles/repositories/roles.repository';
import Roles from '../roles/entities/roles.entity';
import BadRequestI18nException from '../share/errors/custom-errors/bad-request.i18n.exception';
import NotFoundI18nException from '../share/errors/custom-errors/not-found.i18n.exception';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RolesRepository,
  ) {}

  async create(userData: UserInterface): Promise<Omit<User, 'password'>> {
    const existedUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (existedUser) {
      throw new BadRequestI18nException('errors.EXIST', {
        existedItem: 'User',
      });
    }
    const role = await this.roleRepository.find({
      where: { id: In(userData.roles.map((_role) => _role.id)) },
      relations: { permissions: true },
    });
    if (!role.length) {
      throw new NotFoundI18nException('errors.NOT_FOUND', { item: 'Role' });
    }
    const user = this.userRepository.create(userData);
    user.roles = role;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userPasswordExcluded } =
      await this.userRepository.save(user);
    return userPasswordExcluded;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: { roles: { permissions: true } },
    });
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: { roles: { permissions: true } },
    });
  }

  async updateRole(id: number, roles: Roles[]): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundI18nException('errors.NOT_FOUND', { item: 'User' });
    }
    user.roles = roles;
    await this.userRepository.save(user);
    return user;
  }
}
