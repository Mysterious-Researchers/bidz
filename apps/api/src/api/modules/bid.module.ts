import { Module } from '@nestjs/common';
import {MapperModule} from "./mapper.module";
import {BidService} from "../services/bid.service";
import {bidProviders} from "../../database/providers/bid.provider";
import {auctionProviders} from "../../database/providers/auction.provider";
import {userProviders} from "../../database/providers/user.providers";

@Module({
  providers: [BidService, ...bidProviders, ...auctionProviders, ...userProviders],
  exports: [BidService],
  imports: [MapperModule],
})
export class BidModule {}
