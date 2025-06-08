const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const notificacionController = require("../controllers/notificacionController");

// Obtener notificaciones del usuario autenticado
router.get("/", verifyToken, notificacionController.obtenerNotificaciones);

// Marcar una notificación como leída
router.put("/:id/leida", verifyToken, notificacionController.marcarLeida);

// ✅ Nueva ruta para marcar todas como leídas
router.put("/todas/leidas", verifyToken, notificacionController.marcarTodasLeidas);

// Eliminar una notificación por ID
router.delete("/:id", verifyToken, notificacionController.eliminarNotificacion);

// Eliminar todas las notificaciones leídas del usuario autenticado
router.delete("/leidas/todas", verifyToken, notificacionController.eliminarTodasLeidas);

// Contador de notificaciones no leídas
router.get("/no-leidas/count", verifyToken, notificacionController.contarNoLeidas);

// Eliminar todas las notificaciones del usuario autenticado
router.delete("/", verifyToken, notificacionController.eliminarTodas);


module.exports = router;
