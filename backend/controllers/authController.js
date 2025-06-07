const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
    try {
        const { nombre, email, password, dni, telefono, direccion } = req.body;

        const existe = await User.findOne({ where: { email } });
        if (existe) return res.status(400).json({ message: "Email ya registrado" });

        const password_hash = await bcrypt.hash(password, 10);

        const nuevo = await User.create({
            nombre,
            email,
            password_hash,
            rol: "ciudadano", // Siempre como ciudadano
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
