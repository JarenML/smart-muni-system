const express = require('express');
const cors = require('cors');
const path = require('path');

// Conexión a la base de datos
require('./config/db');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Servir archivos subidos (como documentos de trámites)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/usuarios', userRoutes);

const tramiteRoutes = require('./routes/tramiteRoutes');
app.use('/api/tramites', tramiteRoutes);

const chatRoutes = require('./routes/chatRoutes'); // ✅ nombre correcto
app.use('/api/chat', chatRoutes);

// Fallback para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;
