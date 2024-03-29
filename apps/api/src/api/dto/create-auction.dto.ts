import { Photo } from '../../database/entities/photo.entity';

export class CreateAuctionDto {
  name: string;
  startPrice: number;
  stepPrice: number;
  currentPrice: number;
  endDate: string;
  description: string;
  photos: Photo[];
}
