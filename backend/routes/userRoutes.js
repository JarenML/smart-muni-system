// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/perfil', verifyToken, (req, res) => {
    res.json({ message: `Bienvenido usuario ID ${req.user.id} con rol ${req.user.rol}` });
});

module.exports = router;
