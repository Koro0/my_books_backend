import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Cocktail } from './Cocktail.model';
import { Recipe } from './Recipe.model';
@Table({
    tableName: 'Ingredients'
})
export class Ingredients extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    ingredientsId?: number;

    @Column({type:DataType.STRING})
    content?:string;

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