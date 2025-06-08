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
        const prompt = [
            { role: "system", content: "Eres un asistente municipal que responde dudas frecuentes sobre trámites del municipio." },
            { role: "user", content: mensaje }
        ]
        const respuesta = await consultarChatGPT(prompt);
        res.json({ respuesta });
    } catch (error) {
        console.error("❌ Error en consulta simple:", error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
});

// ✅ Ruta con contexto de trámites
router.post("/contextual", verifyToken, preguntarConContexto);

module.exports = router;
