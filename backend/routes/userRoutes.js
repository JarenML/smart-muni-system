// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { requireAdmin } = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");

router.get('/perfil', verifyToken, (req, res) => {
    res.json({ message: `Bienvenido usuario ID ${req.user.id} con rol ${req.user.rol}` });
});


// Route to update user information (Authenticated user)
router.put("/update-user", verifyToken, userController.updateUser);

// Route to change user role (Admin only)
router.put("/change-user-role", verifyToken, requireAdmin, userController.changeUserRole);

router.put("/cambiar-password", verifyToken, userController.changePassword);

router.get("/", verifyToken, requireAdmin, userController.getAllUsers);

module.exports = router;
