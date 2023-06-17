import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';
import User from './entities/user.entity';
import UserRepository from './repositories/user.repository';
import { UserInterface } from './interfaces/user.interface';
import RolesRepository from '../roles/repositories/roles.repository';
import Roles from '../roles/entities/roles.entity';

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
    if (existedUser) throw new BadRequestException('user exist');
    const role = await this.roleRepository.find({
      where: { id: In(userData.roles.map((_role) => _role.id)) },
      relations: { permissions: true },
    });
    if (!role.length) throw new NotFoundException('roles not exist');
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
    if (!user) throw new NotFoundException('user not exist');
    user.roles = roles;
    await this.userRepository.save(user);
    return user;
  }
}
