// models/Curriculo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
console.log("Ejecutando Curriculo");

const Curriculo = sequelize.define('Curriculo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
    archivo_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cargo_postula: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    anios_experiencia: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    educacion: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    evaluacion_ia: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    puntaje_ia: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(30),
        defaultValue: 'recibido',
        validate: {
            isIn: [['recibido', 'en_proceso', 'aceptado', 'rechazado']]
        }
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    creado_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'curriculos',
    timestamps: false
});

module.exports = Curriculo;
