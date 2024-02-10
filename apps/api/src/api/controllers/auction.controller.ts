import { Controller, Get, Param } from '@nestjs/common';
import { AuctionService } from '../services/auction.service';
import { MessageMapper } from '../mappers/message.mapper';
import {BidMapper} from "../mappers/bid.mapper";

@Controller('auctions')
export class AuctionController {
  constructor(
    private auctionService: AuctionService,
    private messageMapper: MessageMapper,
    private bidMapper: BidMapper,
  ) {}

  @Get('/:auctionId/messages')
  async getMessages(@Param('auctionId') auctionId: string) {
    const dbMessages = await this.auctionService.getAuctionMessages(auctionId);
    const messages = this.messageMapper.getMessages(dbMessages);
    return { messages };
  }

  @Get('/:auctionId/bids')
  async getBids(@Param('auctionId') auctionId: string) {
    const dbBids = await this.auctionService.getBids(auctionId);
    const bids = this.bidMapper.getBids(dbBids);
    return { bids };
  }
}
