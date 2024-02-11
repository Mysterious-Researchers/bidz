export class CreateAuctionDto {
  name: string;
  userId: string;
  startPrice: number;
  stepPrice: number;
  endDate: string;
  description: string;
  photos: string[];
}
