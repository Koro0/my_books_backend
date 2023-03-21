import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Cocktail } from "./Cocktail.model";
import { Recipe } from "./Recipe.model";

@Table({
    tableName: 'Method'
})
export class Method extends Model{
    @Column({
        type:DataType.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement: true
    })
    methodId!: number;

    @Column({ type:DataType.STRING})
    methodText?:string;

    @BelongsTo(()=> Cocktail)
    cocktail?:Cocktail;

    @ForeignKey(()=>Cocktail)
    @Column({type: DataType.INTEGER.UNSIGNED})
    cocktailId?:number;

    @BelongsTo(()=> Recipe)
    recipe?:Recipe;

    @ForeignKey(()=> Recipe)
    @Column({type:DataType.INTEGER.UNSIGNED})
    recipeId?:number;
}