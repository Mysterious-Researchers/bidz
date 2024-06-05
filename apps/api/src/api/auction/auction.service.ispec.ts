import { Test } from '@nestjs/testing';
import { MessageModule } from '../message/message.module';
import { BidModule } from '../bid/bid.module';
import { FileModule } from '../../file/file.module';
import { AuctionGateway } from './gateways/auction.gateway';
import { AuctionService } from './auction.service';
import { AuctionMapper } from './auction.mapper';
import { messageProviders } from '../../database/providers/message.provider';
import { bidProviders } from '../../database/providers/bid.provider';
import { auctionProviders } from '../../database/providers/auction.provider';
import { photoProviders } from '../../database/providers/photo.provider';
import { DatabaseModule } from '../../database/database.module';
import { Auction } from '../../database/entities/auction.entity';

describe('Auction integration test', () => {
  let auctionService: AuctionService;
  let auction;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuctionGateway,
        AuctionService,
        AuctionMapper,
        ...messageProviders,
        ...bidProviders,
        ...auctionProviders,
        ...photoProviders,
      ],
      imports: [MessageModule, BidModule, FileModule, DatabaseModule],
    }).compile();
    auctionService = moduleRef.get<AuctionService>(AuctionService);

    auction = await auctionService.createAuction({
      name: 'Vintage Painting Auction',
      startPrice: 100,
      stepPrice: 10,
      currentPrice: 100,
      endDate: '2024-12-31T23:59:59Z',
      description: 'A vintage painting from the 19th century.',
    } as Auction);
  });

  it('should return auction', async () => {
    const gottenAuction = await auctionService.get(auction.id);

    expect(gottenAuction.dataValues).toEqual({
      id: auction.id,
      userId: null,
      name: 'Vintage Painting Auction',
      startPrice: 100,
      stepPrice: 10,
      currentPrice: 100,
      endDate: auction.endDate,
      description: 'A vintage painting from the 19th century.',
      createdAt: auction.createdAt,
      updatedAt: auction.updatedAt,
      photos: [],
    });
  });
});