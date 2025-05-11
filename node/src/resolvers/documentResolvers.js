import { TypeDocumentModel, UserDocumentModel } from '../models/modelRegistry.js';


const documentResolvers = {
    Query: {
        getAllTypeDocuments: async () => {
            return await TypeDocumentModel.findAll();
        },
        documentExists: async (_, { document }) => {
            const doc = await UserDocumentModel.findOne({ where: { document } });
            return !!doc;
        },
    },

    Mutation: {
        createTypeDocument: async (_, { input }) => {
            const { nameTypeDocument } = input;

            const existing = await TypeDocumentModel.findOne({
                where: { nameTypeDocument },
            });
            if (existing) throw new Error('Document type already exists');

            return await TypeDocumentModel.create({ nameTypeDocument });
        },
    },
};

export default documentResolvers;
