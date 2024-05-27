import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty({ description: 'Auction name' })
  @IsNotEmpty()
    name: string;

  @ApiProperty({ description: 'User id' })
  @IsNotEmpty()
    userId: string;

  @ApiProperty({ description: 'Start price' })
  @IsNotEmpty()
    startPrice: number;

  @ApiProperty({ description: 'Step price' })
  @IsNotEmpty()
    stepPrice: number;

  @ApiProperty({ description: 'Current price (equal to start price)' })
  @IsNotEmpty()
    currentPrice: number;

  @ApiProperty({ description: 'End date of auction' })
  @IsNotEmpty()
    endDate: string;

  @ApiPropertyOptional({ description: 'Auction description' })
  @IsOptional()
    description?: string;
}
