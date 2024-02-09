import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { AuthDto } from '../dto/auth.dto';
import { AlreadyRegisteredException } from '../../utils/exceptions/already.registered.exception';
import { MailTokenEntity } from '../../database/entities/mail.token.entity';
import { EmailService } from './email.service';
import { InvalidVerificationTokenException } from '../../utils/exceptions/invalid.verification.token.exception';
import { HOUR } from '../../utils/constants';
import { TokenExpiredException } from '../../utils/exceptions/token.expired.exception';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userModel: typeof User,
    @Inject('MAIL_TOKEN_REPOSITORY')
    private mailModel: typeof MailTokenEntity,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return this.userModel.findAll();
  }

  async create(body: AuthDto) {
    const user = await this.userModel.findOne({
      where: {
        email: body.email,
      },
    });
    if (user) throw new AlreadyRegisteredException();

    const hash = await this.hashPassword(body.password);

    const userModel = await this.userModel.create({
      firstName: body.firstName,
      middleName: body.middleName,
      lastName: body.lastName,
      password: hash,
      email: body.email,
      status: 'PENDING',
    });

    const { id } = await this.mailModel.create({
      userId: userModel.id,
    });

    await this.emailService.sendEmail({
      to: body.email,
      name: body.firstName,
      link: `${process.env.FRONT_BASE_URL}/auth/${id}`,
    });
  }

  async verifyEmail(token: string) {
    const verifyToken = await this.mailModel.findOne({
      where: {
        id: token,
      },
    });

    if (!verifyToken) {
      throw new InvalidVerificationTokenException();
    }

    if (Date.now() - verifyToken.createdAt.getTime() > HOUR) {
      throw new TokenExpiredException();
    }

    const user = await this.userModel.update(
      { status: 'APPROVED' },
      {
        where: {
          id: verifyToken.userId,
        },
      },
    );

    await this.mailModel.destroy({
      where: {
        id: verifyToken.id,
      },
    });
    return this.getTokens(user);
  }

  async getTokens(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      createdAt: Date.now(),
    };

    const refreshTokenPayload = {
      sub: user.id,
      email: user.email,
      createdAt: Date.now(),
      refreshToken: true,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: '1d',
      }),
    };
  }

  async login(user) {
    if (user.status !== 'APPROVED') {
      throw new UnauthorizedException('Email not yer verified');
    }
    return this.getTokens(user);
  }

  async getUser(user) {
    return this.userModel.findOne({
      where: {
        id: user.id,
      },
      attributes: { exclude: ['password'] },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = 7;
    return bcrypt.hash(password, salt);
  }
}
