import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Ticket extends Model {
  public id!: number;
  public eventId!: number;
  public orderId!: number;
  public qrCode!: string;
  public quantity!: number;
  public ticketid!: string;
  public price!: number;
  public email!: string;
  public name!: string;
  public used!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    qrCode: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ticketid: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // ⭐ KRITISK FOR QR-VALIDERING
    },
  },
  {
    sequelize,
    tableName: "tickets",
    timestamps: true,
  }
);

export default Ticket;
