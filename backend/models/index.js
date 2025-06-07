const sequelize = require("../config/db");
const User = require("./User");
console.log("Ejecutando index")
// Aquí puedes asociar modelos si hay relaciones

// Sincroniza todos los modelos
sequelize
  .sync({ alter: true }) // ⚠️ solo en desarrollo
  .then(() => console.log("🗂 Modelos sincronizados con la base de datos"))
  .catch((err) => console.error("❌ Error al sincronizar modelos", err));

module.exports = { sequelize, User };
