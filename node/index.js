import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import typeDefs from './src/schema/typeDefs.js';
import resolvers from './src/resolvers/resolversRegistry.js';
import { db } from './src/models/modelRegistry.js';
import insertSeedData from './src/seed/seed.js';
import createDatabase from './src/config/createDatabase.js';

dotenv.config();

const app = express();
app.use(express.json());

const startServer = async () => {
    try {
        // Crear base de datos si no existe
        await createDatabase();

        // Conectarse a la base de datos
        await db.authenticate();
        console.log('✅ Conectado a la base de datos');

        // Sincronizar modelos y relaciones
        await db.sync({ alter: true });

        // Insertar datos iniciales
        await insertSeedData();

        // Inicializar servidor Apollo
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        await server.start();
        server.applyMiddleware({ app });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
    }
};

startServer();
