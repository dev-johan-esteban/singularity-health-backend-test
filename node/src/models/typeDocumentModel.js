import { DataTypes } from "sequelize";
import db from "../config/db.js";

const TypeDocumentModel = db.define("TypeDocument", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameTypeDocument: { type: DataTypes.STRING(50), allowNull: false },
}, {
    tableName: "tbl_typedocuments",
});

export default TypeDocumentModel;