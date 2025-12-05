import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Menu extends Model {
  public id!: number;
  public title!: string;
  public slug!: string;
  public order!: number;
  public visible!: boolean;
}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "menu",
    modelName: "Menu",
    timestamps: false,
  }
);

export default Menu;
