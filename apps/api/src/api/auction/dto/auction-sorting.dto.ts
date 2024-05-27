import { AuctionSortingEnum } from '../enums/auction-sorting.enum';

export class AuctionSortingDto {
  sortBy?: AuctionSortingEnum;
  sortOrder?: 'ASC' | 'DESC';
}
