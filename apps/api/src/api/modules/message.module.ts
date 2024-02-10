import { Module } from '@nestjs/common';
import { MessageGateway } from '../gateways/message.gateway';
import { MessageService } from '../services/message.service';
import { MessageMapper } from '../mappers/message.mapper';
import { messageProviders } from '../../database/providers/message.provider';
import { DatabaseModule } from '../../database/database.module';
import {userProviders} from "../../database/providers/user.providers";
import {MapperModule} from "./mapper.module";
import {BidModule} from "./bid.module";

@Module({
  providers: [
    MessageGateway,
    MessageService,
    ...messageProviders,
    ...userProviders,
  ],
  exports: [MessageService],
  imports: [MapperModule, BidModule],
})
export class MessageModule {}
