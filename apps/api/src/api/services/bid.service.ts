import { Inject, Injectable } from '@nestjs/common';
import { Bid } from '../../database/entities/bid.entity';
import { BidDto } from '../dto/bid.dto';
import { Auction } from '../../database/entities/auction.entity';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class BidService {
  constructor(
    @Inject('BIDS_REPOSITORY')
    private bidModel: typeof Bid,

    @Inject('AUCTIONS_REPOSITORY')
    private auctionModel: typeof Auction,

    @Inject('USERS_REPOSITORY')
    private userModel: typeof User,
  ) {}

  async saveBid(data: BidDto) {
    const bid = await this.bidModel.create({
      userId: data.userId,
      auctionId: data.auctionId,
      value: data.value,
    });

    await this.auctionModel.increment('currentPrice', {
      by: data.value,
      where: { id: data.auctionId },
    });

    const user = await this.userModel.findOne({
      where: {
        id: data.userId,
      },
    });

    return { bid: bid.dataValues, user: user.dataValues };
  }
}
