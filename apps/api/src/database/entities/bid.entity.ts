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
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Auction)
  @Column({
    type: DataType.UUID,
  })
  auctionId: string;

  @BelongsTo(() => Auction)
  auction: Auction;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  value: number;
}
