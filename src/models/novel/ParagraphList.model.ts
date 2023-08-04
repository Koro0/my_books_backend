import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
  } from "sequelize-typescript";
import { Chapter } from "./Chapter.model";

  @Table({
    tableName: 'ParagraphList'
  })
  export class ParagraphList extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    })
    paragraphId!: number;

    @Column({type:DataType.INTEGER, allowNull:true})
    orders!:number;

    @Column({type:DataType.STRING, allowNull:true})
    paragraph!:string;

    @Column({type:DataType.INTEGER.UNSIGNED, allowNull:true})
    novelId!: number;

    @BelongsTo(()=> Chapter)
    chapter!:Chapter;

    @ForeignKey(()=> Chapter)
    @Column({type:DataType.INTEGER.UNSIGNED})
    chapterId!: number;
  }