import AppUserModel from "./AppUserModel.js";
import UserDocumentModel from "./UserDocumentModel.js";
import TypeDocumentModel from "./TypeDocumentModel.js";
import ContactInfoModel from "./ContactInfoModel.js";
import CountryModel from "./CountryModel.js";

// 1:1 AppUserModel ↔ UserDocumentModel
AppUserModel.hasOne(UserDocumentModel, { foreignKey: "userId", onDelete: "CASCADE" });
UserDocumentModel.belongsTo(AppUserModel, { foreignKey: "userId" });

// N:1 TypeDocument ↔ UserDocumentModel
TypeDocumentModel.hasMany(UserDocumentModel, { foreignKey: "typeDocumentId" });
UserDocumentModel.belongsTo(TypeDocumentModel, { foreignKey: "typeDocumentId" });

// 1:1 AppUserModel ↔ ContactInfoModel
AppUserModel.hasOne(ContactInfoModel, { foreignKey: "userId", onDelete: "CASCADE" });
ContactInfoModel.belongsTo(AppUserModel, { foreignKey: "userId" });

// N:1 CountryModel ↔ ContactInfoModel
CountryModel.hasMany(ContactInfoModel, { foreignKey: "countryId" });
ContactInfoModel.belongsTo(CountryModel, { foreignKey: "countryId" });
