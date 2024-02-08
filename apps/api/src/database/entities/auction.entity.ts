import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Bid } from './bid.entity';

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

  @Column
  name: string;

  @Column({
    type: DataType.FLOAT,
  })
  startPrice: number;

  @Column({
    type: DataType.FLOAT,
  })
  stepPrice: number;

  @Column({
    type: DataType.FLOAT,
  })
  currentPrice: number;

  @Column({
    type: DataType.DATE,
  })
  endDate: string;

  @Column
  description: string;

  @HasMany(() => Bid)
  bids: Bid[];
}
