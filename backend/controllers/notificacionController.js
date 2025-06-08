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

