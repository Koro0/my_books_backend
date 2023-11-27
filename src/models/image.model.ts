import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Image',
})
export class Image extends Model {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  imageId!: number;

  @Column({
    type: DataType.STRING,
  })
  type?: string;

  @Column({
    type: DataType.STRING,
  })
  name?: string;

  @Column({
    type: DataType.BLOB,
  })
  data!: Buffer;
}
