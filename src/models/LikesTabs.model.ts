import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
}from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Novel } from "./novel/Novel.model";
import { Recipe } from "./recipe/Recipe.model";
import { Cocktail } from "./recipe/Cocktail.model";

@Table({
    tableName: 'LikesTab' 
})
export class LikesTab extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey: true,
        allowNull:false 
    })
    likesId!: number;

    @Column({
        type: DataTypes.JSON
    })
    likedUsers?: string[];
    
    @ForeignKey(()=> Novel)
    @Column({type: DataType.INTEGER.UNSIGNED})
    novelId?: number;

    @BelongsTo(()=>Novel)
    novel?: Novel;
    
    @ForeignKey(()=> Recipe)
    @Column({type: DataType.INTEGER.UNSIGNED})
    recipeId?: number;

    @BelongsTo(()=>Recipe)
    recipe?: Recipe;

    @BelongsTo(()=> Cocktail)
    cocktail?:Cocktail;

    @ForeignKey(()=> Cocktail)
    @Column({type:DataType.INTEGER.UNSIGNED})
    cocktailId?: number;
}
