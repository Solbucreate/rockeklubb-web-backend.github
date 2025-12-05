import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Event extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public date!: string;
  public time!: string | null;
  public venue!: string | null;
  public price!: number;
  public capacity!: number;
  public ticketsAvailable!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    venue: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ticketsAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "events",
    timestamps: true,
  }
);

export default Event;
