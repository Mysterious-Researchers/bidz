import { Inject, Injectable } from '@nestjs/common';
import { User } from '../database/entities/user.entity';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userModel: typeof User,
  ) {}

  async findAll() {
    return this.userModel.findAll();
  }

  async create(body: AuthDto) {
    return this.userModel.create({
      nickName: body.nickName,
      password: body.password,
      email: body.email,
    });
  }
}
