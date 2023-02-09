import { Table, Column, Model, DataType, HasMany, ForeignKey} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Chapter } from "./chapter.model";

@Table({
  tableName: 'Novel'
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
  
  @ForeignKey(()=> Chapter)
  @Column
  chapterId!: number; 
  
  @HasMany(()=> Chapter)
  chapters!: Chapter[];

}