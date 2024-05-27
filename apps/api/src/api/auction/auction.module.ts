import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { messageProviders } from '../../database/providers/message.provider';
import { bidProviders } from '../../database/providers/bid.provider';
import { MessageModule } from '../message/message.module';
import { BidModule } from '../bid/bid.module';
import { AuctionGateway } from './gateways/auction.gateway';
import { auctionProviders } from '../../database/providers/auction.provider';
import { photoProviders } from '../../database/providers/photo.provider';
import { FileModule } from '../../file/file.module';
import { AuctionMapper } from './auction.mapper';

@Module({
  controllers: [AuctionController],
  providers: [
    AuctionGateway,
    AuctionService,
    AuctionMapper,
    ...messageProviders,
    ...bidProviders,
    ...auctionProviders,
    ...photoProviders,
  ],
  exports: [AuctionService, AuctionMapper],
  imports: [MessageModule, BidModule, FileModule],
})
export class AuctionModule {}
