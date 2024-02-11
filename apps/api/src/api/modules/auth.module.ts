import { AuthService } from '../services/auth.serviсe';
import { userProviders } from '../../database/providers/user.providers';
import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { mailTokenProvider } from '../../database/providers/mail.token.provider';
import { EmailModule } from './email.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../../security/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../security/strategies/jwt.strategy';
import * as process from 'process';
import { auctionProviders } from '../../database/providers/auction.provider';

@Module({
  exports: [AuthService],
  providers: [
    AuthService,
    ...userProviders,
    ...mailTokenProvider,
    ...auctionProviders,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    EmailModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TTL,
      },
    }),
  ],
})
export class AuthModule {}
