const { User } = require("../models");

// Update User Information
exports.updateUser = async (req, res) => {
    try {
        const { nombre, email, telefono, direccion } = req.body;
        const userId = req.user.id; // Assuming user ID is stored in the request object

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Update user details
        user.nombre = nombre || user.nombre;
        user.email = email || user.email;
        user.telefono = telefono || user.telefono;
        user.direccion = direccion || user.direccion;

        await user.save();

        res.json({ message: "Información actualizada correctamente", user });
    } catch (error) {
        console.error("Error al actualizar información:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Change User Role (Admin only)
exports.changeUserRole = async (req, res) => {
    try {
        const { userId, newRole } = req.body;

        if (!['ciudadano', 'admin'].includes(newRole)) {
            return res.status(400).json({ message: "Rol no válido" });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.rol = newRole;
        await user.save();

        res.json({ message: `Rol de usuario cambiado a ${newRole}`, user });
    } catch (error) {
        console.error("Error al cambiar el rol del usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};