import { Table, Column, Model, DataType} from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table({
  tableName: 'novel'
})
export class Novel extends Model {
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  })
  id?: any;
  
  @Column({type: DataType.STRING, allowNull:true,})
  image?: string;

  @Column({type: DataType.STRING})
  title?: string;

  @Column({type: DataType.STRING})
  type?: string;

  @Column({type: DataType.STRING})
  author?: string;

  @Column({type: DataType.STRING})
  description?: string;

  @Column({type: DataType.INTEGER})
  like: number=0;

  @Column({ type: DataTypes.JSON })
  likesTab?: string[];
  
  @Column({ type: DataTypes.JSON })
  Chapiter?: string[];

}