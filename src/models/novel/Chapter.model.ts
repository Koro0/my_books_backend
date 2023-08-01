import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
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
    
    @Column({type:DataType.INTEGER, allowNull:false})
    chapterNumber? : number;

    @Column({type:DataType.STRING, allowNull:false})
    title!: string;

    @Column({type:DataType.TEXT, allowNull:false})
    content!: string;

    @ForeignKey(()=> Novel) 
    @Column({type:DataType.INTEGER.UNSIGNED})
    novelId!: number;

    @BelongsTo(()=> Novel)
    novel!: Novel;

  }