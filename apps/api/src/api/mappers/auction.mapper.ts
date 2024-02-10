import {Injectable} from "@nestjs/common";
import {Auction} from "../../database/entities/auction.entity";

@Injectable()
export class AuctionMapper {
  getAuction(auction: Auction) {
    return {
      name: auction.dataValues.name,
      description: auction.dataValues.description,
      userId: auction.dataValues.userId,
      startPrice: auction.dataValues.startPrice,
      stepPrice: auction.dataValues.stepPrice,
      currentPrice: auction.dataValues.currentPrice,
      endDate: auction.dataValues.endDate,
    }
  }
}