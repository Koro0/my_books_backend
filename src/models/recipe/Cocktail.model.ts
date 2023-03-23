import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import {Ingredient} from './Ingredient.model';
import {Method} from './Method.model';
@Table({
    tableName: 'Cocktail'
})
export class Cocktail extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
    })
    cocktailId!:number;

    @Column({type:DataType.STRING})
    title!: string;

    @Column({type:DataType.STRING})
    difficulty?:string;

    @Column({type:DataType.STRING})
    portion?:string;

    @Column({type:DataType.STRING})
    time?:string;
    
    @Column({type:DataType.STRING})
    description?:string;

    @HasMany(()=> Ingredient)
    ingredients?:string[];

    @HasMany(()=> Method)
    methods?:string[];

    public async addIngredient(ingredient:Ingredient): Promise<void> {
        await this.$add('ingredients', ingredient);
    }

    public async addMethod(method:Method): Promise<void> {
        await this.$add('methods', method);
    }
}
