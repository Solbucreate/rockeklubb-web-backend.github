import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Page extends Model {
  public id!: number;
  public title!: string;
  public slug!: string;
  public content!: string;
  public image!: string | null; // new
}

Page.init(
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
      unique: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true, // matcher databasen
    }
  },
  {
    sequelize,
    tableName: "pages",
  }
);

export default Page;
