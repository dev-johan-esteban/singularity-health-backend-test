import { CountryModel } from '../models/modelRegistry.js';
import { Op } from 'sequelize';

const countryResolvers = {
    Query: {
        getAllCountries: async () => {
            return await CountryModel.findAll();
        },
    },

    Mutation: {
        createCountry: async (_, { input }) => {
            const { countryCode, countryName } = input;

            const existing = await CountryModel.findOne({
                where: {
                    [Op.or]: [{ countryCode }, { countryName }],
                },
            });
            if (existing) throw new Error('Country already exists');

            return await CountryModel.create({ countryCode, countryName });
        },
    },
};

export default countryResolvers;
