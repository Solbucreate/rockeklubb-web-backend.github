import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Page extends Model {
  public id!: number;
  public slug!: string;
  public title!: string;
  public content!: string;
  public image!: string | null;
}

Page.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "pages",
    modelName: "Page",
    timestamps: false,
  }
);

export default Page;
