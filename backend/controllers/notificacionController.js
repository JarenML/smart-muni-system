const { Notificacion } = require("../models");

// Obtener notificaciones del usuario
exports.obtenerNotificaciones = async (req, res) => {
    try {
        const notificaciones = await Notificacion.findAll({
            where: { user_id: req.user.id },
            order: [['fecha', 'DESC']]
        });
        res.json(notificaciones);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener notificaciones" });
    }
};

// Marcar como leída
exports.marcarLeida = async (req, res) => {
    try {
        const { id } = req.params;
        const noti = await Notificacion.findOne({ where: { id, user_id: req.user.id } });
        if (!noti) return res.status(404).json({ message: "Notificación no encontrada" });

        noti.leido = true;
        await noti.save();
        res.json({ message: "Notificación marcada como leída" });
    } catch (err) {
        res.status(500).json({ message: "Error al marcar como leída" });
    }
    
};

exports.marcarTodasLeidas = async (req, res) => {
        try {
            await Notificacion.update(
                { leido: true },
                { where: { user_id: req.user.id } }
            );
            res.json({ message: "Todas las notificaciones marcadas como leídas" });
        } catch (err) {
            res.status(500).json({ message: "Error al marcar todas como leídas" });
        }
};

exports.eliminarNotificacion = async (req, res) => {
    try {
        const noti = await Notificacion.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id // para asegurar que solo borre sus notificaciones
            }
        });

        if (!noti) return res.status(404).json({ message: "No encontrada" });

        await noti.destroy();
        res.json({ message: "Notificación eliminada" });
    } catch (err) {
        console.error("❌ Error al eliminar notificación:", err);
        res.status(500).json({ message: "Error interno" });
    }
};

exports.eliminarTodasLeidas = async (req, res) => {
    try {
        const eliminadas = await Notificacion.destroy({
            where: {
                user_id: req.user.id,
                leido: true
            }
        });

        res.json({ message: `${eliminadas} notificaciones leídas eliminadas` });
    } catch (error) {
        console.error("❌ Error al eliminar notificaciones leídas:", error);
        res.status(500).json({ message: "Error al eliminar notificaciones" });
    }
};

exports.contarNoLeidas = async (req, res) => {
    try {
        const count = await Notificacion.count({
            where: {
                user_id: req.user.id,
                leido: false
            }
        });

        res.json({ count });
    } catch (error) {
        console.error("❌ Error al contar notificaciones no leídas:", error);
        res.status(500).json({ message: "Error al contar notificaciones" });
    }
};

// Eliminar todas las notificaciones del usuario
exports.eliminarTodas = async (req, res) => {
    try {
        await Notificacion.destroy({ where: { user_id: req.user.id } });
        res.json({ message: "Todas las notificaciones eliminadas correctamente." });
    } catch (error) {
        console.error("Error al eliminar notificaciones:", error);
        res.status(500).json({ message: "Error al eliminar notificaciones." });
    }
};

