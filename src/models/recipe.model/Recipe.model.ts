import { Table, Column, Model, DataType, HasMany, HasOne, BelongsTo, ForeignKey } from "sequelize-typescript";
import { LikesTab } from "../novel/LikesTabs.model";
import { User } from "../User.model";
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

    @Column({ type: DataType.STRING})
    content?: string;

    @Column({type:DataType.STRING})
    image?: string;

    @BelongsTo(()=> User)
    user!:User;

    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER.UNSIGNED})
    author!: number;

    @HasMany(()=> LikesTab)
    likes!: LikesTab[];

    @HasMany(()=> Etape)
    etapes!: Etape[];
}