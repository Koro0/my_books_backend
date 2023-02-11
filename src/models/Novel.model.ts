import { Table, Column, Model, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Chapter } from "./chapter.model";

@Table({
  tableName: 'Novel'
})
export class Novel extends Model {
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false
  })
  novelId!: number;
  
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
  like: number = 0;

  @Column({ type: DataType.JSON })
  likesTab?: string[];
  
  @ForeignKey(()=> Chapter)
  @Column({type: DataType.INTEGER})
  chapterId!: number; 
  
  @BelongsTo(()=> Chapter)
  chapters!: Chapter[];

}