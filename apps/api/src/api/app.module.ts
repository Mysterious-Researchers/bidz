import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from '../database/database.module';
import { EmailModule } from './modules/email.module';
import {AuctionModule} from "./modules/auction.module";

@Module({
  imports: [AuthModule, DatabaseModule, EmailModule, AuctionModule],
})
export class AppModule {}
