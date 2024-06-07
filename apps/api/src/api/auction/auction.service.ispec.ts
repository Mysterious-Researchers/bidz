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
import {AuctionSortingEnum} from "./enums/auction-sorting.enum";

describe('Auction integration test', () => {
  let auctionService: AuctionService;
  let auction;
  let auction2;
  let auction3;
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

    auction2 = await auctionService.createAuction({
      name: 'Container',
      startPrice: 5000,
      stepPrice: 500,
      currentPrice: 6500,
      endDate: '2024-12-31T23:59:59Z',
      description: 'A 10 years old container.',
    } as Auction);

    auction3 = await auctionService.createAuction({
      name: 'Car',
      startPrice: 500000,
      stepPrice: 10000,
      currentPrice: 500000,
      endDate: '2024-12-31T23:59:59Z',
      description: 'Car of the president.',
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

  it('should return sorted by price auctions',async () => {
    const auctions = await auctionService.getAllAuctions({ sortBy: AuctionSortingEnum.CURRENT_PRICE, sortOrder: 'ASC' });

    const mapped = auctions.map((auction) => auction.dataValues);

    expect(mapped).toEqual([{
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
      bids: [],
    }, {
      id: auction2.id,
      userId: null,
      name: 'Container',
      startPrice: 5000,
      stepPrice: 500,
      currentPrice: 6500,
      endDate: auction2.endDate,
      description: 'A 10 years old container.',
      createdAt: auction2.createdAt,
      updatedAt: auction2.updatedAt,
      photos: [],
      bids: [],
    }, {
      id: auction3.id,
      userId: null,
      name: 'Car',
      startPrice: 500000,
      stepPrice: 10000,
      currentPrice: 500000,
      endDate: auction3.endDate,
      description: 'Car of the president.',
      createdAt: auction3.createdAt,
      updatedAt: auction3.updatedAt,
      photos: [],
      bids: [],
    }]);
  });

  it('should return filtered auctions by name', async () => {
    const auctions = await auctionService.getAllAuctions({ sortBy: AuctionSortingEnum.NAME, sortOrder: 'ASC' });

    const mapped = auctions.map((auction) => auction.dataValues);

    expect(mapped).toEqual([{
      id: auction3.id,
      userId: null,
      name: 'Car',
      startPrice: 500000,
      stepPrice: 10000,
      currentPrice: 500000,
      endDate: auction3.endDate,
      description: 'Car of the president.',
      createdAt: auction3.createdAt,
      updatedAt: auction3.updatedAt,
      photos: [],
      bids: [],
    }, {
      id: auction2.id,
      userId: null,
      name: 'Container',
      startPrice: 5000,
      stepPrice: 500,
      currentPrice: 6500,
      endDate: auction2.endDate,
      description: 'A 10 years old container.',
      createdAt: auction2.createdAt,
      updatedAt: auction2.updatedAt,
      photos: [],
      bids: [],
    }, {
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
      bids: [],
    }]);
  });

  it('should update auction', async () => {
    const updatedAuction = await auctionService.updateAuction(auction.id, {
      startPrice: 200,
      stepPrice: 20,
      currentPrice: 200
    });

    expect(updatedAuction).toEqual({
      id: auction.id,
      userId: null,
      name: 'Vintage Painting Auction',
      startPrice: 200,
      stepPrice: 20,
      currentPrice: 200,
      endDate: auction.endDate,
      description: 'A vintage painting from the 19th century.',
      createdAt: auction.createdAt,
      updatedAt: updatedAuction.updatedAt,
      photos: [],
    });
  })


  it('It should return one auction with appropriate name',async () => {
    const auctions = await auctionService.getAllAuctions({ sortBy: AuctionSortingEnum.NAME, sortOrder: 'ASC' }, 'Car');

    const mapped = auctions.map((auction) => auction.dataValues);

    expect(mapped).toEqual([{
      id: auction3.id,
      userId: null,
      name: 'Car',
      startPrice: 500000,
      stepPrice: 10000,
      currentPrice: 500000,
      endDate: auction3.endDate,
      description: 'Car of the president.',
      createdAt: auction3.createdAt,
      updatedAt: auction3.updatedAt,
      photos: [],
      bids: [],
    }]);
  });
});