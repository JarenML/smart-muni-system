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

// Cambiar el estado de un currículum (solo admin)
exports.changeCurriculoStatus = async (req, res) => {
    try {
        const { curriculoId, newState } = req.body;

        // Validar que el nuevo estado sea uno de los estados válidos
        const validStates = ['recibido', 'en_proceso', 'aceptado', 'rechazado'];
        if (!validStates.includes(newState)) {
            return res.status(400).json({ message: "Estado no válido" });
        }

        const curriculo = await Curriculo.findByPk(curriculoId);

        if (!curriculo) {
            return res.status(404).json({ message: "Currículum no encontrado" });
        }

        // Cambiar el estado
        curriculo.estado = newState;
        await curriculo.save();

        res.json({ message: `Estado del currículum cambiado a ${newState}`, curriculo });
    } catch (error) {
        console.error("Error al cambiar el estado del currículum:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Obtener un currículum por ID
exports.getCurriculoById = async (req, res) => {
    try {
        const { id } = req.params; 

        // Buscar el currículum por su ID
        const curriculo = await Curriculo.findByPk(id, {
            include: [{
                model: User, 
                attributes: ['id', 'nombre', 'email', 'telefono', 'direccion']
            }]
        });

        if (!curriculo) {
            return res.status(404).json({ message: "Currículum no encontrado" });
        }

        // Enviar la información del currículum
        res.json(curriculo);
    } catch (error) {
        console.error("Error al obtener currículum:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};