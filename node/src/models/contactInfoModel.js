import { DataTypes } from "sequelize";
import db from "../config/db.js";

const ContactInfoModel = db.define("ContactInfo", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING(60), allowNull: false },
    countryId: { type: DataTypes.INTEGER, allowNull: false },
    city: { type: DataTypes.STRING(50) },
    phone: { type: DataTypes.STRING(20) },
    celPhone: { type: DataTypes.STRING(20) },
    emergencyName: { type: DataTypes.STRING(100) },
    emergencyPhone: { type: DataTypes.STRING(20) },
}, {
    tableName: "tbl_contactinfos",
});

export default ContactInfoModel;