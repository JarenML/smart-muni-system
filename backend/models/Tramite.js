module.exports = (sequelize, DataTypes) => {
  const Tramite = sequelize.define('Tramite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    titulo: { type: DataTypes.STRING(200) },
    descripcion: { type: DataTypes.TEXT },
    archivo_url: { type: DataTypes.TEXT },
    texto_extraido: { type: DataTypes.TEXT },
    tipo_detectado: {
      type: DataTypes.STRING(50),
      validate: {
        isIn: [['Licencia de Funcionamiento', 'Permiso de Construcción', 'Solicitud de Reclamo',
          'Certificado Domiciliario', 'Registro de Empresa', 'Inscripción en Padrón',
          'Autorización de Evento', 'Reclamo de Servicio Público', 'Solicitud de Subsidio', 'Otros']]
      }
    },
    prioridad: {
      type: DataTypes.STRING(30),
      validate: { isIn: [['alta', 'media', 'baja']] }
    },
    estado: {
      type: DataTypes.STRING(30),
      defaultValue: 'recibido',
      validate: { isIn: [['recibido', 'en_revision', 'observado', 'resuelto', 'rechazado']] }
    },
    observaciones: { type: DataTypes.TEXT },
    creado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    actualizado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'tramites',
    timestamps: false
  });

  return Tramite;
};
