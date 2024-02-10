import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../../database/entities/message.entity';
import {User} from "../../database/entities/user.entity";

@Injectable()
export class AuctionService {
  constructor(
    @Inject('MESSAGES_REPOSITORY')
    private messageModel: typeof Message,
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
}
