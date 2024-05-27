import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { bidProviders } from '../../database/providers/bid.provider';
import { auctionProviders } from '../../database/providers/auction.provider';
import { userProviders } from '../../database/providers/user.providers';
import { BidMapper } from './bid.mapper';

@Module({
  providers: [
    BidService,
    BidMapper,
    ...bidProviders,
    ...auctionProviders,
    ...userProviders,
  ],
  exports: [BidService, BidMapper],
})
export class BidModule {}
