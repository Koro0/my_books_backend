import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
} from "sequelize-typescript";
import { Novel } from "./novel/Novel.model";
import { Recipe } from "./recipe/Recipe.model";
import { Cocktail } from "./recipe/Cocktail.model";
import { User } from "./User.model";

@Table({
    tableName: 'Comments'
})
export class Comments extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey: true,
        allowNull:false 
    })
    commentId!:number;

    @Column({
        type: DataType.STRING
    })
    commentText?:string;

    @BelongsTo(()=> User)
    user!: User;

    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER.UNSIGNED})
    userId!:number;

    @BelongsTo(()=>Novel)
    novel?: Novel;

    @ForeignKey(()=> Novel)
    @Column({type: DataType.INTEGER.UNSIGNED})
    novelId?: number;

    @BelongsTo(()=> Recipe)
    recipe?: Recipe;

    @ForeignKey(()=> Recipe)
    @Column({ type: DataType.INTEGER})
    recipeId?: number;

    @BelongsTo(()=> Cocktail)
    cocktail?:Cocktail;

    @ForeignKey(()=> Cocktail)
    @Column({type:DataType.INTEGER.UNSIGNED})
    cocktailId?: number;
}