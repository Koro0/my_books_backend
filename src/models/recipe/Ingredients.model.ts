import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Cocktail } from './Cocktail.model';
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

    @Column({type:DataType.NUMBER, autoIncrement:true})
    etapeNumber?:number;

    @Column({type:DataType.STRING})
    etape?:string;

    @BelongsTo(()=> Cocktail)
    cocktail!:Cocktail;

}