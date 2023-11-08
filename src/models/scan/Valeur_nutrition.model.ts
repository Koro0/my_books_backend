import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from './Product.model';
@Table({
  tableName: 'Valeur_nutrition',
})
export class Valeur_nutrition extends Model {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: any;

  @Column({ type: DataType.INTEGER })
  kcals?: number;

  @Column({ type: DataType.INTEGER })
  matiere_grasse?: number;

  @Column({ type: DataType.INTEGER })
  glucides?: number;

  @Column({ type: DataType.INTEGER })
  proteines?: number;

  @Column({ type: DataType.INTEGER })
  sel?: number;

  @BelongsTo(() => Product)
  product!: Product;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  productID?: number;
}
