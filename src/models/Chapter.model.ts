import { DataTypes } from "sequelize";
import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
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
    id!: number;
    
    @Column({type:DataType.NUMBER, allowNull: false})
    ChapterNumber! : number;

    @Column({type:DataType.STRING, allowNull: false})
    title!: string;

    @Column({type:DataType.STRING, allowNull: false})
    content!: string;

    @Column({type:DataTypes.INTEGER, references:{model:Novel, key:'id',}, onDelete:'CASCADE', onUpdate: 'CASCADE',})
    novelId!: number;

    @BelongsTo(()=> Novel)
    novel!: Novel;
  }