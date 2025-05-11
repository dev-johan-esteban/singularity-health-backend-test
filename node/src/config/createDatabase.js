
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

const createDatabase = async () => {
    

    const connection = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT || 3306,
        user: DB_USER,
        password: DB_PASS,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`✅ Base de datos '${DB_NAME}' verificada/creada`);
    await connection.end();
};

export default createDatabase;
