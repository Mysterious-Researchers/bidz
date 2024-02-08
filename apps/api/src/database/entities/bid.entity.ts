import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Auction } from './auction.entity';

@Table({
  tableName: 'bids',
})
export class Bid extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Auction)
  @Column
  auctionId: string;

  @BelongsTo(() => Auction)
  auction: Auction;

  @Column({
    type: DataType.FLOAT,
  })
  value: number;
}
