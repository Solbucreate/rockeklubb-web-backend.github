import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Settings extends Model {
  public id!: number;
  public logoLeft!: string | null;
  public logoCenter!: string | null;
  public bannerImage!: string | null;
  public heroTitle!: string | null;
  public heroSubtitle!: string | null;
  public newsletterText!: string | null;
  public footerText!: string | null;
}

Settings.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    logoLeft: { type: DataTypes.STRING, allowNull: true },
    logoCenter: { type: DataTypes.STRING, allowNull: true },
    bannerImage: { type: DataTypes.STRING, allowNull: true },

    heroTitle: { type: DataTypes.STRING, allowNull: true },
    heroSubtitle: { type: DataTypes.STRING, allowNull: true },

    newsletterText: { type: DataTypes.STRING, allowNull: true },
    footerText: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: "settings",
    timestamps: false,
  }
);

export default Settings;
