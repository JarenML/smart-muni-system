const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

// Importar modelos
const User = require("./User")(sequelize, DataTypes);
const Tramite = require("./Tramite")(sequelize, DataTypes);
const EstadoTramiteHistorial = require("./EstadoTramiteHistorial")(sequelize, DataTypes);
const Notificacion = require("./Notificacion")(sequelize, DataTypes); // ✅ NUEVO
const Curriculo = require("./Curriculo");


// Logs para debug
console.log("🗂 Ejecutando index.js de modelos");

// Asociaciones explícitas
User.hasMany(Tramite, { foreignKey: 'user_id' });
Tramite.belongsTo(User, { foreignKey: 'user_id' });

Tramite.hasMany(EstadoTramiteHistorial, { foreignKey: 'tramite_id' });
EstadoTramiteHistorial.belongsTo(Tramite, { foreignKey: 'tramite_id' });

// ✅ Relación para notificaciones
User.hasMany(Notificacion, { foreignKey: 'user_id' });
Notificacion.belongsTo(User, { foreignKey: 'user_id' });

Tramite.hasMany(Notificacion, { foreignKey: 'tramite_id' });
Notificacion.belongsTo(Tramite, { foreignKey: 'tramite_id' });

User.hasMany(Curriculo, { foreignKey: 'user_id' });  // 👈 Relación con Curriculo
Curriculo.belongsTo(User, { foreignKey: 'user_id' });  // 👈 Relación con User


// Sincronizar modelos (solo en desarrollo)
sequelize
    .sync({ alter: true }) // ⚠️ Desactiva en producción
    .then(() => console.log("✅ Modelos sincronizados con la base de datos"))
    .catch((err) => console.error("❌ Error al sincronizar modelos:", err));

// Exportar todos los modelos
module.exports = {
  sequelize,
  User,
  Tramite,
  EstadoTramiteHistorial,
  Notificacion, // ✅ Exportar para uso en controladores
  Curriculo
};
