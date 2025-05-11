import AppUserModel from "./AppUserModel.js";
import UserDocumentModel from "./UserDocumentModel.js";
import TypeDocumentModel from "./TypeDocumentModel.js";
import ContactInfoModel from "./ContactInfoModel.js";
import CountryModel from "./CountryModel.js";
import db from "../config/db.js";
import "./associations.js";

// Exporta centralizadamente
export {
    db,
    AppUserModel,
    UserDocumentModel,
    TypeDocumentModel,
    ContactInfoModel,
    CountryModel,
};
