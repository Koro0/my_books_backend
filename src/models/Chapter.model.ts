import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    ForeignKey,
  } from "sequelize-typescript";
import { Novel } from "./Novel.model";

  @Table({
    tableName: 'Chapter'
  })
  export class Chapter extends Model {
    @Column({ 
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,

      allowNull:false
    })
    chapterId!: number;
    
    @Column({type:DataType.INTEGER})
    ChapterNumber? : number;

    @Column({type:DataType.STRING})
    title!: string;

    @Column({type:DataType.STRING})
    content!: string;

    @ForeignKey(()=> Novel) 
    @Column({type:DataType.INTEGER})
    novelId!: number;

    @HasMany(()=> Novel)
    novel!: Novel;

  }