import { Module } from '@nestjs/common';
import {MapperModule} from "./mapper.module";
import {BidService} from "../services/bid.service";
import {bidProviders} from "../../database/providers/bid.provider";

@Module({
  providers: [BidService, ...bidProviders],
  exports: [BidService],
  imports: [MapperModule],
})
export class BidModule {}
