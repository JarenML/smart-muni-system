const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { Notificacion } = require("../models");

// Obtener notificaciones del usuario autenticado
router.get("/", verifyToken, async (req, res) => {
    const notificaciones = await Notificacion.findAll({
        where: { user_id: req.user.id },
        order: [["fecha", "DESC"]]
    });
    res.json(notificaciones);
});

// Marcar una notificación como leída
router.put("/:id/leida", verifyToken, async (req, res) => {
    const notificacion = await Notificacion.findOne({
        where: { id: req.params.id, user_id: req.user.id }
    });
    if (!notificacion) return res.status(404).json({ message: "No encontrada" });

    notificacion.leido = true;
    await notificacion.save();
    res.json({ message: "Marcada como leída" });
});

// ✅ Nueva ruta para marcar todas como leídas
router.put("/todas/leidas", verifyToken, async (req, res) => {
    try {
        await Notificacion.update(
            { leido: true },
            { where: { user_id: req.user.id } }
        );
        res.json({ message: "Todas las notificaciones marcadas como leídas" });
    } catch (error) {
        console.error("Error al marcar todas como leídas:", error);
        res.status(500).json({ message: "Error interno" });
    }
});

module.exports = router;
