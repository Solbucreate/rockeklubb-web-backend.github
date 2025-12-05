import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Order extends Model {
  public id!: number;
  public eventId!: number;
  public email!: string;
  public fullname!: string | null;
  public phonenumber!: string | null;
  public quantity!: number;
  public totalPrice!: number;
  public paymentStatus!: string;   // pending, paid, failed
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
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

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phonenumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "pending",  // pending → paid → failed
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
