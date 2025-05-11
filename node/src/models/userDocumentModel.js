import { DataTypes } from "sequelize";
import db from "../config/db.js";

const UserDocumentModel = db.define("UserDocument", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    typeDocumentId: { type: DataTypes.INTEGER, allowNull: false },
    document: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    placeExpedition: { type: DataTypes.STRING(60), allowNull: false },
    dateExpedition: { type: DataTypes.DATEONLY, allowNull: false },
}, {
    tableName: "tbl_userdocuments",
});

export default UserDocumentModel;