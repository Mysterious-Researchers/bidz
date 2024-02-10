import { Module } from '@nestjs/common';
import { BidMapper } from '../mappers/bid.mapper';
import { MessageMapper } from '../mappers/message.mapper';
import { AuctionMapper } from '../mappers/auction.mapper';

@Module({
  providers: [BidMapper, MessageMapper, AuctionMapper],
  exports: [BidMapper, MessageMapper, AuctionMapper],
})
export class MapperModule {}
