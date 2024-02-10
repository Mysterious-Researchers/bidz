import { Message } from '../../database/entities/message.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class MessageMapper {
  getUserMessage(message: Message, user: User) {
    return {
      id: message.id,
      auctionId: message.auctionId,
      text: message.text,
      createdAt: message.createdAt,
      user: {
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
      },
    };
  }

  getMessages(messages: Message[]) {
    return messages.map(({ dataValues }) =>
      this.getUserMessage(dataValues, dataValues.user.dataValues),
    );
  }
}
