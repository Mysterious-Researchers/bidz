import { Sequelize } from 'sequelize-typescript';
import { User } from '../entities/user.entity';
import * as process from 'process';
import { Bid } from '../entities/bid.entity';
import { Message } from '../entities/message.entity';
import { Photo } from '../entities/photo.entity';
import { Auction } from '../entities/auction.entity';
import { MailTokenEntity } from '../entities/mail.token.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DATABASE_URL);
      sequelize.addModels([
        User,
        Bid,
        Message,
        Photo,
        Auction,
        MailTokenEntity,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
