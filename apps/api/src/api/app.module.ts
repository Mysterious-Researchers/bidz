import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from '../database/database.module';
import { EmailModule } from './modules/email.module';
import { AuctionModule } from './modules/auction.module';
import { BidModule } from './modules/bid.module';
import { PhotoModule } from './modules/photo.module';
import { FileModule } from '../config/file.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    EmailModule,
    AuctionModule,
    BidModule,
    FileModule,
    PhotoModule,
  ],
})
export class AppModule {}
