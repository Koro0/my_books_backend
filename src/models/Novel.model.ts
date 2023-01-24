import { Table, Column, Model, DataType, Index } from "sequelize-typescript";

@Table({
  tableName: 'novel'
})
export class Novel extends Model {
  @Column({type: DataType.STRING, allowNull:true,})
  image?: string;

  @Column({type: DataType.STRING})
  title: string ='';

  @Column({type: DataType.STRING})
  type: string ='';

  @Column({type: DataType.STRING})
  author: string='';

  @Column({type: DataType.STRING})
  description: string='';

  @Column({type: DataType.INTEGER})
  like: number=0;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  likesTab?: string[];
  
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  Chapiter?: string[];

}