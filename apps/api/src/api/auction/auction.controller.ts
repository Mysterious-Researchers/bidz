import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { MessageMapper } from '../message/message.mapper';
import { BidMapper } from '../bid/bid.mapper';
import { AuctionMapper } from './auction.mapper';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuctionSortingDto } from './dto/auction-sorting.dto';

@Controller('auctions')
export class AuctionController {
  constructor (
    private auctionService: AuctionService,
    private auctionMapper: AuctionMapper,
    private messageMapper: MessageMapper,
    private bidMapper: BidMapper,
  ) {}

  @Get('/:auctionId')
  async get (@Param('auctionId') auctionId: string) {
    const dbAuction = await this.auctionService.get(auctionId);
    return this.auctionMapper.getAuction(dbAuction);
  }

  @Get()
  async getAllAuctions (
    @Query() sortOptions?: AuctionSortingDto,
    @Query('name') name?: string,
  ) {
    const auctions = await this.auctionService.getAllAuctions(sortOptions, name);
    return this.auctionMapper.getAuctions(auctions);
  }

  @Get('/:auctionId/messages')
  async getMessages (
    @Param('auctionId') auctionId: string,
  ) {
    const dbMessages = await this.auctionService.getAuctionMessages(auctionId);
    const messages = this.messageMapper.getMessages(dbMessages);
    return { messages };
  }

  @Get('/:auctionId/bids')
  async getBids (
    @Param('auctionId') auctionId: string,
  ) {
    const dbBids = await this.auctionService.getBids(auctionId);
    const bids = this.bidMapper.getBids(dbBids);
    return { bids };
  }

  @Post()
  async createAuction (
    @Body() body: CreateAuctionDto,
  ) {
    const auction = await this.auctionService.createAuction(body);
    return this.auctionMapper.getAuction(auction);
  }

  @Patch('/:id')
  async updateAuction (
    @Param('id') auctionId: string,
    @Body() updatedAuctionData: Partial<CreateAuctionDto>,
  ) {
    return this.auctionService.updateAuction(auctionId, updatedAuctionData);
  }
}
