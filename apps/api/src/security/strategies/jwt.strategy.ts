import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ForbiddenException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../database/entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userModel: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload) {
    const user = await this.userModel.findOne({
      where: { id: payload.sub },
    });

    if (!user) throw new UnauthorizedException();

    if (user.status !== 'APPROVED') throw new ForbiddenException();

    delete user.dataValues.password;

    return user.dataValues;
  }
}
