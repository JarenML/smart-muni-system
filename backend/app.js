// app.js
const express = require('express');
const cors = require('cors');

require('./config/db'); // conexión Sequelize

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rutas (agregarás progresivamente)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/usuarios', userRoutes);

// ✅ Nueva ruta de trámites
const tramiteRoutes = require('./routes/tramiteRoutes');
app.use('/api/tramites', tramiteRoutes);
//ruta de chat gpt
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);


module.exports = app;
