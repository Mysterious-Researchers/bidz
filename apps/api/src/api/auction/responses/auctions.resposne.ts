import { ApiProperty } from '@nestjs/swagger';

export class PhotoResponse {
  @ApiProperty({ description: 'Photo index' })
    index: number;

  @ApiProperty({ description: 'Photo link' })
    link: string;
}

class ShortAuctionResponse {
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

  @ApiProperty({ description: 'Auction current price' })
    currentPrice: number;

  @ApiProperty({ description: 'Auction bids count' })
    bids: number;
}

export class AuctionsResponse {
  @ApiProperty({
    description: 'Array of auctions',
    type: [ShortAuctionResponse],
  })
    auctions: ShortAuctionResponse[];
}
