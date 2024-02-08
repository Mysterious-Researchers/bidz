import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey, HasMany,
} from 'sequelize-typescript';
import {Bid} from "./bid.entity";

const Statuses = ['APPROVED', 'PENDING', 'DECLINED'];

@Table({
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  firstName: string;

  @Column
  middleName: string;

  @Column({
    allowNull: false,
  })
  lastName: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM({ values: Statuses }),
    defaultValue: Statuses[1],
    allowNull: false,
  })
  status: string;

  @HasMany(() => Bid)
  bids: Bid[];
}
