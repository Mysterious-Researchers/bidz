import { AuctionSortingEnum } from '../enums/auction-sorting.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AuctionSortingDto {
  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: AuctionSortingEnum,
  })
    sortBy?: AuctionSortingEnum;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
  })
    sortOrder?: 'ASC' | 'DESC';
}
