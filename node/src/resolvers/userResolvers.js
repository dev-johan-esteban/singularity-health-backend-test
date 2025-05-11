import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { AppUserModel, UserDocumentModel, ContactInfoModel } from '../models/modelRegistry.js';
import { generateVerificationToken, verifyToken } from '../utils/jwt.js';
import sendVerificationEmail from '../utils/sendVerificationEmail.js';



const userResolvers = {
    Query: {
        emailExists: async (_, { email }) => {
            const user = await AppUserModel.findOne({ where: { email } });
            return !!user; // true si existe, false si no
        },
        usernameExists: async (_, { username }) => {
            const user = await AppUserModel.findOne({ where: { username } });
            return !!user;
        },
    },

    Mutation: {
        registerUser: async (_, { input }) => {
            const {
                lastName, name, isMiliar, isTemporal, username, password, email,
                document, placeExpedition, dateExpedition, typeDocumentId,
                address, countryId, city, phone, celPhone, emergencyName, emergencyPhone,
            } = input;

            const existingEmail = await AppUserModel.findOne({ where: { email } });
            if (existingEmail) {
                throw new Error('El correo electrónico ya está registrado');
            }

            const existingUsername = await AppUserModel.findOne({ where: { username } });
            if (existingUsername) {
                throw new Error('El nombre de usuario ya está registrado');
            }

            const existingDocument = await UserDocumentModel.findOne({ where: { document } });
            if (existingDocument) {
                throw new Error('El documento ya está registrado');
            }


            const hashedPassword = await bcrypt.hash(password, 10);
            const verificationToken = generateVerificationToken({ email });

            const newUser = await AppUserModel.create({
                lastName, name, isMiliar, isTemporal, username, password: hashedPassword, email, verificationToken,
            });

            await UserDocumentModel.create({
                userId: newUser.id, document, placeExpedition, dateExpedition, typeDocumentId,
            });

            await ContactInfoModel.create({
                userId: newUser.id, address, countryId, city, phone, celPhone, emergencyName, emergencyPhone,
            });

            // 📩 ENVIAR CORREO
            await sendVerificationEmail(newUser);

            return newUser;
        },

        verifyEmail: async (_, { token }) => {
            const payload = verifyToken(token);
            if (!payload?.userId) throw new Error('El token es invalido o expiro');

            const user = await AppUserModel.findByPk(payload.userId);
            if (!user) throw new Error('Usuario no encontrado');
            if (user.emailVerified) return 'El correo ya fue verificado anteriormente';

            await user.update({ emailVerified: true, verificationToken: null });
            return 'Correo verificado correctamente';
        },
    },


};

export default userResolvers;
