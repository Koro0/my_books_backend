import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
  } from "sequelize-typescript";
import { Recipe } from "./Recipe.model";
  
  @Table({
    tableName: 'Etape'
  })
  export class Etape extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    })
    etapeId?:number;

    @Column({
        type: DataType.STRING
    })
    etapeNumber?: string;

    @Column({
        type: DataType.STRING
    })
    Content?:string;

    @ForeignKey(()=> Recipe)
    @Column({type: DataType.INTEGER.UNSIGNED})
    RecipeId!: number;

    @BelongsTo(()=> Recipe)
    Recipe!: Recipe;
  }