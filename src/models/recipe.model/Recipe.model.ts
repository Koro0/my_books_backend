import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Etape } from "./etape.model";

@Table({
  tableName: 'Recipe'
}) 
export class Recipe extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    RecipeId?: any;

    @Column({
        type: DataType.STRING
    })
    title?:string;

    @Column({type:DataType.STRING})
    image?: string;

    @HasMany(()=> Etape)
    etapes!: Etape[];
}