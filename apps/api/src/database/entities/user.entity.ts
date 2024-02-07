import {Table, Column, Model, DataType, PrimaryKey} from "sequelize-typescript";

@Table
export class User extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column
    nickName: string;

    @Column
    email: string;

    @Column
    password: string;
}

