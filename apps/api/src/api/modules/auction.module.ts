import { Module } from '@nestjs/common';
import { AuctionService } from '../services/auction.service';
import { AuctionController } from '../controllers/auction.controller';
import { messageProviders } from '../../database/providers/message.provider';
import { DatabaseModule } from '../../database/database.module';
import { MessageMapper } from '../mappers/message.mapper';

@Module({
  controllers: [AuctionController],
  providers: [AuctionService, MessageMapper, ...messageProviders],
  exports: [AuctionService],
  imports: [DatabaseModule],
})
export class AuctionModule {}
