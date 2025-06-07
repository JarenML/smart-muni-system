// server.js
require('dotenv').config(); // Carga variables desde .env

const app = require('./app'); // Tu aplicación Express central
const PORT = process.env.PORT || 4000; // Usa puerto de .env o por defecto 4000

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
