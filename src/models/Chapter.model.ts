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
      primaryKey: true
    })
    id?: any;
    
    @Column({type:DataType.NUMBER})
    ChapterNumber? : number;

    @Column({type:DataType.STRING})
    title!: string;

    @Column({type:DataType.STRING})
    content!: string;

    @ForeignKey(()=> Novel)
    @Column
    novelId!: number;

    @HasMany(()=> Novel)
    novel!: Novel;

  }