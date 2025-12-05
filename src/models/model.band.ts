import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const band = sequelize.define("band", {
  name: DataTypes.STRING,
  genre: DataTypes.STRING
});

export default band;
