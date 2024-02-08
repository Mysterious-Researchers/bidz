import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Auction } from './auction.entity';

@Table({
  tableName: 'photos',
})
export class Photo extends Model {
  @Column({
    unique: true,
    allowNull: false,
  })
  link: string;

  @Column({
    allowNull: false,
  })
  index: number;

  @ForeignKey(() => Auction)
  @Column
  auctionId: string;

  @BelongsTo(() => Auction)
  auction: Auction;
}
