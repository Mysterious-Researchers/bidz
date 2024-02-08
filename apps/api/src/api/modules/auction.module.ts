import { Module } from '@nestjs/common';
import { AuctionService } from '../services/auction.service';
import { AuctionController } from '../controllers/auction.controller';
import { messageProviders } from '../../database/providers/message.provider';
import { bidProviders } from '../../database/providers/bid.provider';
import { MessageModule } from './message.module';
import { BidModule } from './bid.module';
import { MapperModule } from './mapper.module';
import { AuctionGateway } from '../gateways/auction.gateway';
import { auctionProviders } from '../../database/providers/auction.provider';
import { FileService } from '../../config/file.service';
import { photoProviders } from '../../database/providers/photo.provider';

@Module({
  controllers: [AuctionController],
  providers: [
    AuctionGateway,
    AuctionService,
    FileService,
    ...messageProviders,
    ...bidProviders,
    ...auctionProviders,
    ...photoProviders,
  ],
  exports: [AuctionService],
  imports: [MessageModule, BidModule, MapperModule],
})
export class AuctionModule {}
