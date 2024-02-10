import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../../database/entities/message.entity';
import {User} from "../../database/entities/user.entity";
import {Bid} from "../../database/entities/bid.entity";

@Injectable()
export class AuctionService {
  constructor(
    @Inject('MESSAGES_REPOSITORY')
    private messageModel: typeof Message,

    @Inject('BIDS_REPOSITORY')
    private bidModel: typeof Bid,
  ) {}

  async getAuctionMessages(auctionId: string) {
    return this.messageModel.findAll({
      where: {
        auctionId,
      },
      order: [['createdAt', 'ASC']],
      include: [{ model: User }],
    });
  }

  async getBids(auctionId: string) {
    return this.bidModel.findAll({
      where: {
        auctionId,
      },
      order: [['createdAt', 'ASC']],
      include: [{ model: User }],
    });
  }
}
