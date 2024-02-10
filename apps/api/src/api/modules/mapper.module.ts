import {Module} from "@nestjs/common";
import {BidMapper} from "../mappers/bid.mapper";
import {MessageModule} from "./message.module";

@Module({
  imports: [BidMapper, MessageModule],
  exports: [BidMapper, MessageModule],
})
export class MapperModule {}
