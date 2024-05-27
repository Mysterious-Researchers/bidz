import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { messageProviders } from '../../database/providers/message.provider';
import { userProviders } from '../../database/providers/user.providers';
import { MessageMapper } from './message.mapper';

@Module({
  providers: [
    MessageService,
    MessageMapper,
    ...messageProviders,
    ...userProviders,
  ],
  exports: [MessageService, MessageMapper],
})
export class MessageModule {}
