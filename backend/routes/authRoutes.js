// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require("../middlewares/authMiddleware");
const { requireAdmin } = require("../middlewares/roleMiddleware");

router.post('/login', authController.login);
router.post('/register', authController.register);

// Route to update user information (Authenticated user)
router.put("/update-user", verifyToken, authController.updateUser);

// Route to change user role (Admin only)
router.put("/change-user-role", verifyToken, requireAdmin, authController.changeUserRole);


module.exports = router;
