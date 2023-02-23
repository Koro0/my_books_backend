import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
}from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Novel } from "./Novel.model";
import { Recipe } from "../recipe.model/Recipe.model";

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
    novel!: Novel;
    
    @ForeignKey(()=> Recipe)
    @Column({type: DataType.INTEGER.UNSIGNED})
    recipeId?: number;

    @BelongsTo(()=>Recipe)
    Recipe!: Recipe;
}
