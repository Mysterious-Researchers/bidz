import { Injectable } from '@nestjs/common';
import { Bid } from '../../database/entities/bid.entity';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class BidMapper {
  getUserBid(bid: Bid, user: User) {
    return {
      id: bid.id,
      auctionId: bid.auctionId,
      value: bid.value,
      createdAt: bid.createdAt,
      user: {
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
      },
    };
  }

  getBids(bids: Bid[]) {
    return bids.map(({ dataValues }) =>
      this.getUserBid(dataValues, dataValues.user.dataValues),
    );
  }
}
