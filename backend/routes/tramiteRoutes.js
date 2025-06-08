const express = require("express");
const router = express.Router();

const {
    crearTramite,
    obtenerMisTramites,
    obtenerTodosTramites,
    actualizarEstadoTramite,
    obtenerHistorialTramite,
    descargarHistorialPDF
} = require("../controllers/tramiteController");

const { verifyToken } = require("../middlewares/authMiddleware");
const { requireAdmin } = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // Middleware para archivos

// Crear trámite con archivo adjunto (ciudadano)
router.post("/", verifyToken, upload.single("archivo"), crearTramite);

// Obtener los propios trámites (ciudadano)
router.get("/mis", verifyToken, obtenerMisTramites);

// Obtener todos los trámites (solo admin)
router.get("/", verifyToken, requireAdmin, obtenerTodosTramites);

// Actualizar estado del trámite (solo admin)
router.put("/:id/estado", verifyToken, requireAdmin, actualizarEstadoTramite);

// ✅ Obtener historial de un trámite (admin o ciudadano dueño)
router.get("/:id/historial", verifyToken, obtenerHistorialTramite);

// exportación del historial de estado de un trámite como PDF
router.get("/:id/historial/pdf", verifyToken, descargarHistorialPDF);


module.exports = router;
