import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { EntityNotFoundException } from '../../utils/exceptions/entity.not.found.exception';
import * as bcrypt from 'bcrypt';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userModel: typeof User,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new EntityNotFoundException('User');

    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) throw new UnauthorizedException('Password is wrong');

    delete user.dataValues.password;

    return user.dataValues;
  }
}
