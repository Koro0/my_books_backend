import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'User'
}) 
export class User extends Model {
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  })
  id?: any;

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
    type: DataType.BOOLEAN,
  })
  adminStatus!:boolean;
}

