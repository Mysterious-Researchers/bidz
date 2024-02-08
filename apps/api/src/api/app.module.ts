import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
