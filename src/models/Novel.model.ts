import { Table, Column, Model, DataType, ForeignKey, HasMany} from "sequelize-typescript";
import { Chapter } from "./chapter.model";
import { LikesTab} from "./likesTabs.model";

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

  @Column({type: DataType.STRING, allowNull:false}) 
  title!: string;

  @Column({type: DataType.STRING})
  type?: string;

  @Column({type: DataType.STRING})
  author?: string;

  @Column({type: DataType.STRING})
  description?: string; 

  @Column({type: DataType.INTEGER})
  likesCount: number = 0;

  /*@ForeignKey(()=> LikesTab)
  @Column({type: DataType.INTEGER.UNSIGNED})
  likesId?: number;*/

  @HasMany(()=> LikesTab)
  likesTab!: LikesTab[];
  /*
  @ForeignKey(()=> Chapter)
  @Column({type: DataType.INTEGER.UNSIGNED})
  chapterId?: number; */
  
  @HasMany(()=> Chapter)
  chapters!: Chapter[];

}