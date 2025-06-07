// models/Tramite.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Tramite = sequelize.define('Tramite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  archivo_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  texto_extraido: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipo_detectado: {
    type: DataTypes.STRING(50),
    validate: {
      isIn: [[
        'Licencia de Funcionamiento',
        'Permiso de Construcción',
        'Solicitud de Reclamo',
        'Certificado Domiciliario',
        'Registro de Empresa',
        'Inscripción en Padrón',
        'Autorización de Evento',
        'Reclamo de Servicio Público',
        'Solicitud de Subsidio',
        'Otros'
      ]]
    }
  },
  prioridad: {
    type: DataTypes.STRING(30),
    validate: {
      isIn: [['alta', 'media', 'baja']]
    }
  },
  estado: {
    type: DataTypes.STRING(30),
    defaultValue: 'recibido',
    validate: {
      isIn: [['recibido', 'en_revision', 'observado', 'resuelto', 'rechazado']]
    }
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creado_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  actualizado_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'tramites',
  timestamps: false
});

Tramite.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Tramite;
