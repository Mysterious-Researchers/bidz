import { ApiProperty } from '@nestjs/swagger';

class ShortUserResponse {
  @ApiProperty({ description: 'User id' })
    id: string;

  @ApiProperty({ description: 'User first name' })
    firstName: string;

  @ApiProperty({ description: 'User middle name' })
    middleName?: string;

  @ApiProperty({ description: 'User last name' })
    lastName: string;
}

class BidResponse {
  @ApiProperty({ description: 'Bid id' })
    id: string;

  @ApiProperty({ description: 'Auction id' })
    auctionId: string;

  @ApiProperty({ description: 'Value' })
    value: number;

  @ApiProperty({ description: 'Date of bid creation' })
    createdAt: Date;

  @ApiProperty({
    description: 'User data',
    type: ShortUserResponse,
  })
    user: ShortUserResponse;
}

export class BidsResponse {
  @ApiProperty({
    description: 'Array of bids',
    type: [BidResponse],
  })
    bids: BidResponse[];
}