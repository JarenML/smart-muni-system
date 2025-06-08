const express = require('express');
const router = express.Router();
const { consultarChatGPT } = require('../services/chatgptService');
const { verifyToken } = require("../middlewares/authMiddleware");
const { preguntarConContexto } = require('../controllers/chatbotController');

// Ruta básica: sin contexto
router.post("/", verifyToken, async (req, res) => {
    const { mensaje } = req.body;
    if (!mensaje) return res.status(400).json({ message: "Mensaje requerido" });

    try {
        const respuesta = await consultarChatGPT(mensaje);
        res.json({ respuesta });
    } catch (error) {
        console.error("❌ Error en consulta simple:", error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
});

// ✅ Ruta con contexto de trámites
router.post("/contextual", verifyToken, preguntarConContexto);

module.exports = router;
