import { Module } from '@nestjs/common';
import { AuctionService } from '../services/auction.service';
import { AuctionController } from '../controllers/auction.controller';
import { messageProviders } from '../../database/providers/message.provider';
import { DatabaseModule } from '../../database/database.module';
import {bidProviders} from "../../database/providers/bid.provider";
import {BidMapper} from "../mappers/bid.mapper";
import {MessageModule} from "./message.module";
import {BidModule} from "./bid.module";

@Module({
  controllers: [AuctionController],
  providers: [
    AuctionService,
    ...messageProviders,
    ...bidProviders,
  ],
  exports: [AuctionService],
  imports: [DatabaseModule, MessageModule, BidModule],
})
export class AuctionModule {}
