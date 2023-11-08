import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Valeur_nutrition } from './Valeur_nutrition.model';

@Table({
  tableName: 'Product',
})
export class Product extends Model {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: any;

  @Column({ type: DataType.INTEGER })
  series?: number;

  @Column({ type: DataType.STRING })
  name?: string;

  @Column({ type: DataType.STRING })
  fabriant?: string;

  @Column({ type: DataTypes.JSON })
  valeur_nutrition?: string[];

  public async nutritions(nutrition: Valeur_nutrition): Promise<void> {
    await this.$add('Valeur_nutrition', nutrition);
  }
}
