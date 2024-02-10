import {Module} from "@nestjs/common";
import {BidMapper} from "../mappers/bid.mapper";
import {MessageModule} from "./message.module";
import {MessageMapper} from "../mappers/message.mapper";

@Module({
  providers: [BidMapper, MessageMapper],
  exports: [BidMapper, MessageMapper],
})
export class MapperModule {}
