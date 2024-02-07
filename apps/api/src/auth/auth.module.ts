import { AuthService } from './auth.servise';
import { userProviders } from '../database/providers/user.providers';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  exports: [AuthService],
  providers: [AuthService, ...userProviders],
  controllers: [AuthController],
  imports: [DatabaseModule],
})
export class AuthModule {}
