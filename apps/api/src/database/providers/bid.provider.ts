import { Bid } from '../entities/bid.entity';

export const bidProviders = [
  {
    provide: 'BIDS_REPOSITORY',
    useValue: Bid,
  },
];