import { Module } from '@nestjs/common';
import {MapperModule} from "./mapper.module";

@Module({
  imports: [MapperModule],
})
export class BidModule {}
