// config/db.js
const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,       
    process.env.DB_USER,       
    process.env.DB_PASSWORD,   
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false, //  true para ver las consultas SQL
    }
);

// Probar conexion
sequelize.authenticate()
    .then(() => console.log('✅ Conexión a PostgreSQL establecida.'))
    .catch(err => console.error('❌ Error de conexión a la base de datos:', err));

module.exports = sequelize;

