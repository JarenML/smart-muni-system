const express = require('express');
const cors = require('cors');
const path = require('path');

// Conexión a la base de datos
require('./config/db');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas principales
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/usuarios', userRoutes);

const tramiteRoutes = require('./routes/tramiteRoutes');
app.use('/api/tramites', tramiteRoutes);

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

// ✅ Notificaciones (debe ir antes del 404)
const notificacionRoutes = require("./routes/notificacionRoutes");
app.use("/api/notificaciones", notificacionRoutes);

const curriculoRoutes = require("./routes/curriculoRoutes"); 
app.use("/api/curriculos", curriculoRoutes);

// Fallback 404
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;
