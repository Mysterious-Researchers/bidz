import { AuthService } from '../services/auth.serviсe';
import { userProviders } from '../../database/providers/user.providers';
import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  exports: [AuthService],
  providers: [AuthService, ...userProviders],
  controllers: [AuthController],
  imports: [DatabaseModule],
})
export class AuthModule {}
