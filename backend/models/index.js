const sequelize = require("../config/db");
const User = require("./User");
const Tramite = require("./Tramite");
const EstadoTramiteHistorial = require("./EstadoTramiteHistorial")(sequelize, require("sequelize").DataTypes); // 👈

// Logs para debug
console.log("🗂 Ejecutando index.js de modelos");

// Asociaciones explícitas
User.hasMany(Tramite, { foreignKey: 'user_id' });
Tramite.belongsTo(User, { foreignKey: 'user_id' });

Tramite.hasMany(EstadoTramiteHistorial, { foreignKey: 'tramite_id' }); // 👈
EstadoTramiteHistorial.belongsTo(Tramite, { foreignKey: 'tramite_id' }); // 👈

// Sincronizar modelos (solo en desarrollo)
sequelize
    .sync({ alter: true }) // ⚠️ Cambiar a false en producción
    .then(() => console.log("✅ Modelos sincronizados con la base de datos"))
    .catch((err) => console.error("❌ Error al sincronizar modelos:", err));

module.exports = {
  sequelize,
  User,
  Tramite,
  EstadoTramiteHistorial // 👈 Exportación
};
