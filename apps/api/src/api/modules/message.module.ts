import { Module } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { messageProviders } from '../../database/providers/message.provider';
import { userProviders } from '../../database/providers/user.providers';
import { MapperModule } from './mapper.module';

@Module({
  providers: [MessageService, ...messageProviders, ...userProviders],
  exports: [MessageService],
  imports: [MapperModule],
})
export class MessageModule {}
