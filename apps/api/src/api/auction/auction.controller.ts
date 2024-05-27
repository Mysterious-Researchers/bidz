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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuctionResponse } from './responses/auction.response';
import { AuctionsResponse } from './responses/auctions.resposne';
import { BidsResponse } from '../bid/responses/bids.resposne';

@ApiTags('Auction')
@Controller('auctions')
export class AuctionController {
  constructor (
    private readonly auctionService: AuctionService,
    private readonly auctionMapper: AuctionMapper,
    private readonly messageMapper: MessageMapper,
    private readonly bidMapper: BidMapper,
  ) {}

  @Get('/:auctionId')
  @ApiOperation({ summary: 'Get auction by id' })
  @ApiOkResponse({ type: AuctionResponse })
  async get (
    @Param('auctionId') auctionId: string
  ) {
    const dbAuction = await this.auctionService.get(auctionId);
    return this.auctionMapper.getAuction(dbAuction);
  }

  @Get()
  @ApiOperation({ summary: 'Get all auctions' })
  @ApiOkResponse({ type: AuctionsResponse })
  async getAllAuctions (
    @Query() sortOptions?: AuctionSortingDto,
    @Query('name') name?: string,
  ) {
    const auctions = await this.auctionService.getAllAuctions(sortOptions, name);
    return { auctions: this.auctionMapper.getAuctions(auctions) };
  }

  @Get('/:auctionId/messages')
  @ApiOperation({ summary: 'Get all messages for auction' })
  async getMessages (
    @Param('auctionId') auctionId: string,
  ) {
    const dbMessages = await this.auctionService.getAuctionMessages(auctionId);
    const messages = this.messageMapper.getMessages(dbMessages);
    return { messages };
  }

  @Get('/:auctionId/bids')
  @ApiOperation({ summary: 'Get all bids for auction' })
  @ApiOkResponse({ type: BidsResponse })
  async getBids (
    @Param('auctionId') auctionId: string,
  ) {
    const dbBids = await this.auctionService.getBids(auctionId);
    const bids = this.bidMapper.getBids(dbBids);
    return { bids };
  }

  @Post()
  @ApiOperation({ summary: 'Create auction' })
  @ApiOkResponse({ type: AuctionResponse })
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
