import { Injectable } from '@nestjs/common';
import { Auction } from '../../database/entities/auction.entity';

@Injectable()
export class AuctionMapper {
  getAuction (auction: Auction) {
    return {
      id: auction.dataValues.id,
      name: auction.dataValues.name,
      photos: auction.dataValues.photos.map(
        ({ dataValues: { index, link } }) => ({
          index,
          link,
        }),
      ),
      description: auction.dataValues.description,
      userId: auction.dataValues.userId,
      startPrice: auction.dataValues.startPrice,
      stepPrice: auction.dataValues.stepPrice,
      currentPrice: auction.dataValues.currentPrice,
      endDate: auction.dataValues.endDate,
    };
  }

  getAuctions (auctions: Auction[]) {
    return auctions.map((auction) => ({
      id: auction.id,
      name: auction.name,
      photos: auction.photos.map(({ dataValues: { index, link } }) => ({
        index,
        link,
      })),
      description: auction.description,
      currentPrice: auction.currentPrice,
      bids: auction.bids.length,
    }));
  }
}
