const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
    try {
        const { nombre, email, password, dni, telefono, direccion, rol } = req.body;

        const existe = await User.findOne({ where: { email } });
        if (existe) return res.status(400).json({ message: "Email ya registrado" });

        const password_hash = await bcrypt.hash(password, 10);

        const nuevo = await User.create({
            nombre,
            email,
            password_hash,
            rol, 
            dni,
            telefono,
            direccion,
        });

        res.status(201).json({
            message: "Usuario creado",
            user: { id: nuevo.id, email: nuevo.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error en el registro" });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const valido = await bcrypt.compare(password, user.password_hash);
        if (!valido) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

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
