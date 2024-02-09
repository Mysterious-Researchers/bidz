import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Bid } from './bid.entity';
import { Photo } from './photo.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Table({
  tableName: 'auctions',
})
export class Auction extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  startPrice: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  stepPrice: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  currentPrice: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate: string;

  @Column({
    allowNull: false,
  })
  description: string;

  @HasMany(() => Bid)
  bids: Bid[];

  @HasMany(() => Photo)
  photos: Photo[];

  @HasMany(() => Message)
  messages: Message[];
}
