import { AuctionSortingParams } from './auction.sorting.params';

export class AuctionSortingDto {
  sortBy?: AuctionSortingParams;
  sortOrder?: 'ASC' | 'DESC';
}
