const { Curriculo, User } = require("../models");

// Obtener todos los currículos (solo admin)
exports.getAllCurriculos = async (req, res) => {
    try {
        const curriculos = await Curriculo.findAll({
            include: [{
                model: User, 
                attributes: ['id', 'nombre', 'email', 'telefono', 'direccion']
            }],
            order: [['creado_en', 'DESC']]
        });
        res.json(curriculos);
    } catch (error) {
        console.error("Error al obtener currículos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
