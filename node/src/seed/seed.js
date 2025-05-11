// src/seed/seedData.js
import { TypeDocumentModel, CountryModel } from '../models/modelRegistry.js';

const insertSeedData = async () => {
    // Tipos de documento
    const tiposDocumento = [
        { nameTypeDocument: 'Cédula de ciudadanía' },
        { nameTypeDocument: 'Pasaporte' },
        { nameTypeDocument: 'Cédula extranjera' },
    ];
    for (const tipo of tiposDocumento) {
        await TypeDocumentModel.findOrCreate({
            where: { nameTypeDocument: tipo.nameTypeDocument },
            defaults: tipo,
        });
    }

    // Países
    const paises = [
        { countryCode: 'CO', countryName: 'Colombia' },
        { countryCode: 'AR', countryName: 'Argentina' },
        { countryCode: 'MX', countryName: 'México' },
    ];
    for (const pais of paises) {
        await CountryModel.findOrCreate({
            where: { countryCode: pais.countryCode },
            defaults: pais,
        });
    }

    console.log('✅ Datos base insertados');
};

export default insertSeedData;
