import { ApiProperty } from '@nestjs/swagger';
import { PhotoResponse } from './auctions.resposne';

export class AuctionResponse {
  @ApiProperty({ description: 'Auction id' })
    id: string;

  @ApiProperty({ description: 'Auction name' })
    name: string;

  @ApiProperty({
    description: 'Auction photos',
    type: [PhotoResponse],
  })
    photos: PhotoResponse[];

  @ApiProperty({ description: 'Auction description' })
    description: string;

  @ApiProperty({ description: 'Auction user id' })
    userId: string;

  @ApiProperty({ description: 'Auction start price' })
    startPrice: number;

  @ApiProperty({ description: 'Auction step price' })
    stepPrice: number;

  @ApiProperty({ description: 'Auction current price' })
    currentPrice: number;

  @ApiProperty({ description: 'Auction end date' })
    endDate: Date;
}
