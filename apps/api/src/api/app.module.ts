import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from '../database/database.module';
import { EmailModule } from './modules/email.module';
import { AuctionModule } from './modules/auction.module';
import { BidModule } from './modules/bid.module';

@Module({
  imports: [AuthModule, DatabaseModule, EmailModule, AuctionModule, BidModule],
})
export class AppModule {}
