import { Test } from "@nestjs/testing";
import { MessageModule } from "../../message/message.module";
import { BidModule } from "../../bid/bid.module";
import { FileModule } from "../../../file/file.module";
import { AuctionGateway } from "../gateways/auction.gateway";
import { AuctionService } from "../auction.service";
import { AuctionMapper } from "../auction.mapper";
import { messageProviders } from "../../../database/providers/message.provider";
import { bidProviders } from "../../../database/providers/bid.provider";
import { auctionProviders } from "../../../database/providers/auction.provider";
import { photoProviders } from "../../../database/providers/photo.provider";
import { DatabaseModule } from "../../../database/database.module";
import { Auction } from "../../../database/entities/auction.entity";
import { AuctionSortingEnum } from "../enums/auction-sorting.enum";

describe('Auction integration test', () => {
  let auctionService: AuctionService;
  let auction1;
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

    auction1 = await auctionService.createAuction({
      name: "Vintage Painting Auction",
      startPrice: 100,
      stepPrice: 10,
      currentPrice: 100,
      endDate: "2024-12-31T23:59:59Z",
      description: "A vintage painting from the 19th century.",
    } as Auction);

    auction2 = await auctionService.createAuction({
      name: "Container",
      startPrice: 500,
      stepPrice: 100,
      currentPrice: 600,
      endDate: "2024-12-31T23:59:59Z", // Corrected date format
      description: "15 years old container.",
    } as Auction);

    auction3 = await auctionService.createAuction({
      name: "Linkin park's group guitar",
      startPrice: 8000,
      stepPrice: 500,
      currentPrice: 15000,
      endDate: "2024-12-31T23:59:59Z", // Corrected date format
      description: "Linkin park's group guitar from 2000s.",
    } as Auction);
  });

  it('should return auction', async () => {
    const gottenAuction = await auctionService.getAllAuctions({ sortBy: AuctionSortingEnum.CURRENT_PRICE, sortOrder: 'ASC' });

    const auctions = gottenAuction.map((auction) => {
      return auction.dataValues;
    })
    console.log(gottenAuction)

    expect(auctions).toEqual([
      {
        id: auction1.id,
        name: 'Vintage Painting Auction',
        userId: null,
        startPrice: 100,
        stepPrice: 10,
        currentPrice: 100,
        endDate: auction1.endDate,
        description: 'A vintage painting from the 19th century.',
        createdAt: auction1.createdAt,
        updatedAt: auction1.updatedAt,
        photos: [],
        bids: []
      },
      {
        id: auction2.id,
        name: 'Container',
        userId: null,
        startPrice: 500,
        stepPrice: 100,
        currentPrice: 600,
        endDate: auction2.endDate,
        description: '15 years old container.',
        createdAt: auction2.createdAt,
        updatedAt: auction2.updatedAt,
        photos: [],
        bids: []
      },
      {
        id: auction3.id,
        name: "Linkin park's group guitar",
        userId: null,
        startPrice: 8000,
        stepPrice: 500,
        currentPrice: 15000,
        endDate: auction3.endDate,
        description: "Linkin park's group guitar from 2000s.",
        createdAt: auction3.createdAt,
        updatedAt: auction3.updatedAt,
        photos: [],
        bids: []
      }
    ]);
  });
});
