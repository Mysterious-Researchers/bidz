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
import { User } from './user.entity';

@Table({
  tableName: 'messages',
})
export class Message extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Auction)
  @Column({
    type: DataType.UUID,
  })
  auctionId: string;

  @BelongsTo(() => Auction)
  auction: Auction;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column
  text: string;
}
