import { Table, Column, Model, DataType, HasMany} from "sequelize-typescript";
import { Chapter } from "./Chapter.model";
import { LikesTab} from "../LikesTabs.model";
import { Comments } from "../Comments.models";

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

  @Column({type: DataType.TEXT})
  description?: string; 

  @Column({type: DataType.INTEGER})
  likesCount: number = 0;

  @HasMany(()=> Comments)
  comments!: Comments[];
  
  @HasMany(()=> LikesTab)
  likesTab!: LikesTab[];
  
  @HasMany(()=> Chapter)
  chapters!: Chapter[];

}