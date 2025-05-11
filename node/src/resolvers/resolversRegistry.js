
// import bcrypt from 'bcryptjs';
// import { Op } from 'sequelize';
// import {
//   AppUserModel,
//   UserDocumentModel,
//   ContactInfoModel,
//   TypeDocumentModel,
//   CountryModel
// } from '../models/modelRegistry.js';

// import {
//   generateVerificationToken,
//   verifyToken
// } from '../utils/jwt.js';

// const resolvers = {
//   Mutation: {
//     registerUser: async (_, { input }) => {
//       const {
//         lastName,
//         name,
//         isMiliar,
//         isTemporal,
//         username,
//         password,
//         email,
//         document,
//         placeExpedition,
//         dateExpedition,
//         typeDocumentId,
//         address,
//         countryId,
//         city,
//         phone,
//         celPhone,
//         emergencyName,
//         emergencyPhone,
//       } = input;

//       const existingUser = await AppUserModel.findOne({
//         where: {
//           [Op.or]: [{ email }, { username }],
//         },
//       });
//       if (existingUser) {
//         throw new Error('El correo o usuario ya están registrados');
//       }

//       const existingDocument = await UserDocumentModel.findOne({
//         where: { document },
//       });
//       if (existingDocument) {
//         throw new Error('El documento ya está registrado');
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const verificationToken = generateVerificationToken({ email });

//       const newUser = await AppUserModel.create({
//         lastName,
//         name,
//         isMiliar,
//         isTemporal,
//         username,
//         password: hashedPassword,
//         email,
//         verificationToken,
//       });

//       await UserDocumentModel.create({
//         userId: newUser.id,
//         document,
//         placeExpedition,
//         dateExpedition,
//         typeDocumentId,
//       });

//       await ContactInfoModel.create({
//         userId: newUser.id,
//         address,
//         countryId,
//         city,
//         phone,
//         celPhone,
//         emergencyName,
//         emergencyPhone,
//       });

//       return newUser;
//     },

//     verifyEmail: async (_, { token }) => {
//       const payload = verifyToken(token);

//       if (!payload || !payload.email) {
//         throw new Error('Token inválido o expirado');
//       }

//       const user = await AppUserModel.findOne({
//         where: { email: payload.email },
//       });

//       if (!user) {
//         throw new Error('Usuario no encontrado');
//       }

//       if (user.emailVerified) {
//         return 'El correo ya estaba verificado';
//       }

//       await user.update({
//         emailVerified: true,
//         verificationToken: null,
//       });

//       return 'Correo verificado exitosamente';
//     },

//     createTypeDocument: async (_, { input }) => {
//       const { nameTypeDocument } = input;

//       const existing = await TypeDocumentModel.findOne({
//         where: { nameTypeDocument },
//       });
//       if (existing) {
//         throw new Error('Ya existe un tipo de documento con ese nombre');
//       }

//       return await TypeDocumentModel.create({ nameTypeDocument });
//     },

//     createCountry: async (_, { input }) => {
//       const { countryCode, countryName } = input;

//       const existing = await CountryModel.findOne({
//         where: {
//           [Op.or]: [{ countryCode }, { countryName }],
//         },
//       });
//       if (existing) {
//         throw new Error('Ya existe un país con ese código o nombre');
//       }

//       return await CountryModel.create({ countryCode, countryName });
//     },
//   },
// };

// export default resolvers;



import userResolvers from './userResolvers.js';
import documentResolvers from './documentResolvers.js';
import countryResolvers from './countryResolvers.js';

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...documentResolvers.Query,
        ...countryResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...documentResolvers.Mutation,
        ...countryResolvers.Mutation,
    },
};

export default resolvers;
