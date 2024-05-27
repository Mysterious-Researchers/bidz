export class CreateAuctionDto {
  name: string;
  userId: string;
  startPrice: number;
  stepPrice: number;
  currentPrice: number;
  endDate: string;
  description: string;
}
