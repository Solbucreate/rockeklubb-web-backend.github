import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Band extends Model {
  public id!: number;
  public name!: string;
  public genre!: string | null;
  public image!: string | null;
  public description!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Band.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true, // /uploads/filnavn.jpg
    },
  },
  {
    sequelize,
    tableName: "bands",
    timestamps: true,
  }
);

export default Band;
