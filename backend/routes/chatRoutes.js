const express = require('express');
const router = express.Router();
const { consultarChatGPT } = require('../services/chatgptService');
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", verifyToken, async (req, res) => {
    const { mensaje } = req.body;
    if (!mensaje) return res.status(400).json({ message: "Mensaje requerido" });

    const respuesta = await consultarChatGPT(mensaje);
    res.json({ respuesta });
});

module.exports = router;
