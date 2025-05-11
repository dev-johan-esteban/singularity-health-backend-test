import { DataTypes } from "sequelize";
import db from "../config/db.js";

const CountryModel = db.define("Country", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    countryCode: { type: DataTypes.STRING(4), allowNull: false },
    countryName: { type: DataTypes.STRING(100), allowNull: false },
}, {
    tableName: "tbl_countrys",
});

export default CountryModel;