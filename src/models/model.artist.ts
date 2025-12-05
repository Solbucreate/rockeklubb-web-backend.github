import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Artist extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public image!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Artist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
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
    tableName: "artists",
    modelName: "Artist",
    timestamps: true,
  }
);

export default Artist;
