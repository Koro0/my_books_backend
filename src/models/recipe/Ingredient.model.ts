import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Cocktail } from './Cocktail.model';
import { Recipe } from './Recipe.model';
@Table({
    tableName: 'Ingredient'
})
export class Ingredient extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    ingredientId?: number;

    @Column({type:DataType.STRING})
    quantity?:string;

    @Column({type:DataType.STRING})
    name?:string;

    @BelongsTo(()=> Cocktail)
    cocktail?:Cocktail;
    
    @ForeignKey(()=> Cocktail)
    @Column({type: DataType.INTEGER.UNSIGNED})
    cocktailId?:number;

    @BelongsTo(()=> Recipe)
    recipe?:Recipe;

    @ForeignKey(()=> Recipe)
    @Column({ type:DataType.INTEGER.UNSIGNED})
    recipeId?:number;
}