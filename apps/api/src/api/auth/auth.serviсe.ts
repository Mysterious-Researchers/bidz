import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { AlreadyRegisteredException } from '../../utils/exceptions/already.registered.exception';
import { MailTokenEntity } from '../../database/entities/mail.token.entity';
import { EmailService } from '../email/email.service';
import { InvalidVerificationTokenException } from '../../utils/exceptions/invalid.verification.token.exception';
import { HOUR } from '../../utils/constants';
import { TokenExpiredException } from '../../utils/exceptions/token.expired.exception';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Auction } from '../../database/entities/auction.entity';
import { UserResponse } from './responses/user.response';

@Injectable()
export class AuthService {
  constructor (
    @Inject('USERS_REPOSITORY')
    private userModel: typeof User,

    @Inject('MAIL_TOKEN_REPOSITORY')
    private mailModel: typeof MailTokenEntity,

    @Inject('AUCTIONS_REPOSITORY')
    private auctionModel: typeof Auction,

    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async create (body: AuthDto) {
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
      userId: userModel.dataValues.id,
    });

    await this.emailService.sendEmail({
      to: body.email,
      name: body.firstName,
      link: `${process.env.FRONT_BASE_URL}/auth/${id}`,
    });
  }

  async verifyEmail (token: string) {
    const verifyToken = await this.mailModel.findOne({
      where: {
        id: token,
      },
    });

    if (!verifyToken) {
      throw new InvalidVerificationTokenException();
    }

    if (Date.now() - verifyToken.dataValues.createdAt.getTime() > HOUR) {
      throw new TokenExpiredException();
    }

    const userId = verifyToken.dataValues.userId;

    await this.userModel.update(
      { status: 'APPROVED' },
      {
        where: {
          id: userId,
        },
      },
    );

    await this.mailModel.destroy({
      where: {
        id: verifyToken.dataValues.id,
      },
    });

    const user = await this.userModel.findOne({ where: { id: userId } });

    return this.getTokens(user.dataValues);
  }

  async getTokens (user: User) {
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

  async login (user: User) {
    if (user.status !== 'APPROVED') {
      throw new UnauthorizedException('Email not yer verified');
    }
    return this.getTokens(user);
  }

  async getUser (user: User): Promise<UserResponse> {
    const auctions = await this.auctionModel.findAll({
      where: {
        userId: user.id,
      },
    });

    return {
      ...user,
      auctions: auctions.map(({ dataValues }) => dataValues.id),
    };
  }

  async hashPassword (password: string): Promise<string> {
    const salt = 7;
    return bcrypt.hash(password, salt);
  }
}
