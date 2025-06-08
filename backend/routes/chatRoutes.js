const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const chatbotController = require('../controllers/chatbotController');

// Ruta básica: sin contexto
router.post("/", verifyToken, );

// ✅ Ruta con contexto de trámites
router.post("/contextual", verifyToken, chatbotController.preguntarConContexto);

module.exports = router;
