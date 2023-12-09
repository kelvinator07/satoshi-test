import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "coins",
})
export default class Coin extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "symbol",
  })
  symbol?: string;

  @Column({
    type: DataType.STRING(255),
    field: "name",
  })
  name?: string;

  @Column({
    type: DataType.INTEGER,
    field: "current_price",
  })
  current_price?: number;
}
