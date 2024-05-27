import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ description: 'Photo index' })
    index: number;

  @ApiProperty({ description: 'Auction id' })
    auctionId: string;
}
