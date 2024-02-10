import { Controller, Get, Param } from '@nestjs/common';
import { AuctionService } from '../services/auction.service';
import { MessageMapper } from '../mappers/message.mapper';

@Controller('auctions')
export class AuctionController {
  constructor(
    private auctionService: AuctionService,
    private messageMapper: MessageMapper,
  ) {}

  @Get('/:auctionId/messages')
  async getMessages(@Param('auctionId') auctionId: string) {
    const dbMessages = await this.auctionService.getAuctionMessages(auctionId);
    const messages = this.messageMapper.getMessages(dbMessages);
    return { messages };
  }
}
