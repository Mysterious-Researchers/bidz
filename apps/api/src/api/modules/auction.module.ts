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

@Module({
  controllers: [AuctionController],
  providers: [
    AuctionGateway,
    AuctionService,
    ...messageProviders,
    ...bidProviders,
    ...auctionProviders,
  ],
  exports: [AuctionService],
  imports: [MessageModule, BidModule, MapperModule],
})
export class AuctionModule {}
