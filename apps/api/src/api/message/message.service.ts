import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../../database/entities/message.entity';
import { MessageDto } from './dto/message.dto';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class MessageService {
  constructor (
    @Inject('MESSAGES_REPOSITORY')
    private messageModel: typeof Message,

    @Inject('USERS_REPOSITORY')
    private userModel: typeof User,
  ) {}

  async saveMessage (data: MessageDto) {
    const message = await this.messageModel.create({
      userId: data.userId,
      auctionId: data.auctionId,
      text: data.text,
    });

    const user = await this.userModel.findOne({
      where: {
        id: data.userId,
      },
    });

    return { message: message.dataValues, user: user.dataValues };
  }
}
