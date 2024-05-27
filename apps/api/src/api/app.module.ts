import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { EmailModule } from './email/email.module';
import { AuctionModule } from './auction/auction.module';
import { BidModule } from './bid/bid.module';
import { PhotoModule } from './photo/photo.module';
import { FileModule } from '../file/file.module';


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
