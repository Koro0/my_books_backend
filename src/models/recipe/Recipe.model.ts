import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { LikesTab } from "../novel/LikesTabs.model";
import { User } from "../User.model";

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

    @Column({
        type: DataType.STRING
    })
    strEtape1?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape2?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape3?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape4?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape5?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape6?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape7?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape8?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape9?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape10?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape11?: string;

    @Column({
        type: DataType.STRING
    })
    strEtape12?: string;


    @BelongsTo(()=> User)
    user!:User;

    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER.UNSIGNED})
    author!: number;

    @HasMany(()=> LikesTab)
    likes!: LikesTab[];

}