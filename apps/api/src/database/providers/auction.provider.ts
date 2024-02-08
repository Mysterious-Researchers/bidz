import { Auction } from '../entities/auction.entity';

export const auctionProviders = [
  {
    provide: 'AUCTIONS_REPOSITORY',
    useValue: Auction,
  },
];
