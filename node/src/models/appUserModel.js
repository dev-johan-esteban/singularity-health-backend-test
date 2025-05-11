import { DataTypes } from "sequelize";
import db from "../config/db.js";

const AppUserModel = db.define("AppUser", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lastName: { type: DataTypes.STRING(20), allowNull: false },
    name: { type: DataTypes.STRING(20), allowNull: false },
    isMiliar: { type: DataTypes.BOOLEAN, defaultValue: true },
    timeCreate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    isTemporal: { type: DataTypes.BOOLEAN, defaultValue: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    emailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verificationToken: { type: DataTypes.STRING },
}, {
    tableName: "tbl_appusers",
});

export default AppUserModel;