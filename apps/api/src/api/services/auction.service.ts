import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '../../database/entities/message.entity';
import { User } from '../../database/entities/user.entity';
import { Bid } from '../../database/entities/bid.entity';
import { Auction } from '../../database/entities/auction.entity';
import { CreateAuctionDto } from '../dto/create-auction.dto';
import { Photo } from '../../database/entities/photo.entity';

@Injectable()
export class AuctionService {
  constructor(
    @Inject('MESSAGES_REPOSITORY')
    private messageModel: typeof Message,

    @Inject('BIDS_REPOSITORY')
    private bidModel: typeof Bid,

    @Inject('AUCTIONS_REPOSITORY')
    private auctionModel: typeof Auction,

    @Inject('PHOTOS_REPOSITORY')
    private photoModel: typeof Photo,
  ) {}

  async getAuctionMessages(auctionId: string) {
    return this.messageModel.findAll({
      where: {
        auctionId,
      },
      order: [['createdAt', 'ASC']],
      include: [{ model: User }],
    });
  }

  async getBids(auctionId: string) {
    return this.bidModel.findAll({
      where: {
        auctionId,
      },
      order: [['createdAt', 'ASC']],
      include: [{ model: User }],
    });
  }

  async get(auctionId: string) {
    return this.auctionModel.findOne({
      where: {
        id: auctionId,
      },
    });
  }

  async getAllAuctions() {
    return this.auctionModel.findAll({
      include: [
        {
          model: Photo,
        },
      ],
    });
  }

  async createAuction(auctionData: CreateAuctionDto) {
    const { dataValues } = await this.auctionModel.create({
      userId: auctionData.userId,
      name: auctionData.name,
      endDate: auctionData.endDate,
      description: auctionData.description,
      startPrice: auctionData.startPrice,
      stepPrice: auctionData.stepPrice,
    });

    await Promise.all(
      auctionData.photos.map(async (link) => {
        await this.photoModel.update(
          { auctionId: dataValues.id },
          { where: { link } },
        );
      }),
    );

    return {
      id: dataValues.id,
      currentPrice: dataValues.currentPrice,
      ...auctionData,
    };
  }

  async updateAuction(
    auctionId: string,
    updatedAuctionData: Partial<CreateAuctionDto>,
  ): Promise<Auction> {
    const auction = await this.auctionModel.findByPk(auctionId, {
      include: [this.photoModel],
    });

    if (!auction) {
      throw new NotFoundException(`Auction with ID ${auctionId} not found`);
    }

    await auction.update(updatedAuctionData);

    await auction.$set('photos', []);

    if (updatedAuctionData.photos && updatedAuctionData.photos.length > 0) {
      const updatedPhotos = await this.photoModel.findAll({
        where: { link: updatedAuctionData.photos.map((photo) => photo.link) },
      });

      await auction.$add('photos', updatedPhotos);
    }

    const updatedPhotos = await auction.$get('photos');

    return {
      ...auction.dataValues,
      photos: updatedPhotos,
    } as Auction;
  }
}
