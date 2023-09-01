import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Books = db.define(
  "books",
  {
    name: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
    file: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
  }
);

export default Books;
