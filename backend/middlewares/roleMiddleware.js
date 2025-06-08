// backend/middlewares/roleMiddleware.js

exports.requireAdmin = (req, res, next) => {
    if (!req.user || req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso restringido a administradores' });
    }
    next();
};
