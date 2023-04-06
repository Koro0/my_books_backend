import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { LikesTab } from "../LikesTabs.model";
import { User } from "../User.model";
import { Method } from "./Method.model";
import { Ingredient } from "./Ingredient.model";

@Table({
  tableName: 'Recipe'
}) 
export class Recipe extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    recipeId?: number;

    @Column({
        type: DataType.STRING
    })
    title?:string;

    @Column({ type: DataType.STRING})
    description?: string;

    @Column({type:DataType.STRING})
    portion?:string;

    @Column({type:DataType.STRING})
    time?:string;

    @Column({type:DataType.STRING})
    image?: string;

    @BelongsTo(()=> User)
    user!:User;

    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER.UNSIGNED})
    author?: number;

    @HasMany(()=> LikesTab)
    likes!: LikesTab[];

    @HasMany(()=> Method)
    ingredients!: Ingredient[];

    @HasMany(()=> Method)
    methods!: Method[];

    public async addIngredient(ingredient:Ingredient): Promise<void> {
        await this.$add('Ingredient', ingredient);
    }

    public async addMethod(method:Method): Promise<void> {
        await this.$add('Method', method);
    }
}