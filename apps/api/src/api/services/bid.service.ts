import {Inject, Injectable} from "@nestjs/common";
import {Bid} from "../../database/entities/bid.entity";
import {BidDto} from "../dto/bid.dto";

@Injectable()
export class BidService {
  constructor(
    @Inject('BIDS_REPOSITORY')
    private bidModel: typeof Bid,
  ) {}

  async saveBid(data: BidDto) {
    const bid = await this.bidModel.create({
      userId: data.userId,
      auctionId: data.auctionId,
      value: data.value,
    });

    const user = await this.bidModel.findOne({
      where: {
        id: data.userId,
      },
    });

    return { bid: bid.dataValues, user: user.dataValues };
  }
}