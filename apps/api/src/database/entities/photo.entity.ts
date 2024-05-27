import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Auction } from './auction.entity';

@Table({
  tableName: 'photos',
})
export class Photo extends Model {
  @PrimaryKey
  @Column({
    unique: true,
  })
    link: string;

  @Column({
    allowNull: false,
  })
    index: number;

  @ForeignKey(() => Auction)
  @Column({
    type: DataType.UUID,
  })
    auctionId: string;

  @BelongsTo(() => Auction)
    auction: Auction;
}
