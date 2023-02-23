import { Table, Column, Model, DataType} from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table({
    tableName: 'Product' 
})
export class Product extends Model {
    @Column({ 
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      })
      id?: any;

    @Column({type: DataType.INTEGER})
    series?:number;

    @Column({type: DataType.STRING})
    name?:string;

    @Column({type: DataTypes.JSON})
    detail?:string[];
}