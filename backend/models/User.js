// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
console.log("Ejecutando User")
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  rol: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: { isIn: [['ciudadano', 'admin']] }
  },
  dni: { type: DataTypes.STRING(20) },
  telefono: { type: DataTypes.STRING(30) },
  direccion: { type: DataTypes.TEXT },
  creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
