const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { requireAdmin } = require("../middlewares/roleMiddleware");
const curriculoController = require("../controllers/curriculoController");

// Obtener todos los currículos (solo admin)
router.get("/", verifyToken, requireAdmin, curriculoController.getAllCurriculos);

// Cambiar el estado de un currículum (solo admin)
router.put("/cambiar-estado", verifyToken, requireAdmin, curriculoController.changeCurriculoStatus);

module.exports = router;
