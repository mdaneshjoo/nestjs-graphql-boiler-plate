import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import UserRepository from './repositories/user.repository';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(userData: Omit<User, 'hashPassword'>) {
    const existedUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (existedUser) throw new BadRequestException('user exist');
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
}
