import { Injectable } from '@nestjs/common';
import CreateAuthInput from './dto/create-auth.input';
import UpdateAuthInput from './dto/update-auth.input';

@Injectable()
export default class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createAuthInput: CreateAuthInput) {
    return 'This action adds a new auth';
  }

  findAll() {
    return 'This action returns all auth';
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
