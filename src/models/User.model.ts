import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Recipe } from "./recipe/Recipe.model";

@Table({
  tableName: 'User'
}) 
export class User extends Model {
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  })
  userId!: number;

  @Column({ type: DataType.STRING})
  pseudo?: string;
  
  @Column({ 
    type: DataType.STRING,
    unique:true,
    allowNull:false,
    validate: {isEmail:true}
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!:string;

  @Column({
    type: DataType.NUMBER,
    allowNull:false,
  })
  adminStatus:number = 1 | 0;

  @HasMany(()=> Recipe)
  recipe?:string[];
}

