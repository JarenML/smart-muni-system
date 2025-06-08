const { Tramite } = require("../models");
const { consultarChatGPT } = require("../services/chatgptService");
const {
    obtenerHistorial,
    guardarMensaje
} = require("../services/contextMemory");

exports.preguntarConContexto = async (req, res) => {
    try {
        const { mensaje } = req.body;
        const user_id = req.user.id;

        if (!mensaje) {
            return res.status(400).json({ message: "Mensaje requerido" });
        }

        const tramites = await Tramite.findAll({
            attributes: ["id", "titulo", "estado", "prioridad", "tipo_detectado", "creado_en"]
        });

        const resumen = tramites.map(t =>
            `Trámite ${t.id}: ${t.titulo} (${t.tipo_detectado}) - prioridad ${t.prioridad}, estado: ${t.estado}, creado el ${t.creado_en}`
        ).join('\n');

        const historial = obtenerHistorial(user_id);

        // Armar prompt completo con instrucciones + historial del usuario
        const prompt = [
            {
                role: "system",
                content: `Eres un asistente virtual de una municipalidad. Esta es la lista de trámites registrados:\n${resumen}\nPuedes recordar lo que el usuario te dice en esta sesión.`
            },
            ...historial,
            { role: "user", content: mensaje }
        ];

        const respuesta = await consultarChatGPT(prompt);

        // Guardar el intercambio en la memoria del usuario
        guardarMensaje(user_id, { role: "user", content: mensaje });
        guardarMensaje(user_id, { role: "assistant", content: respuesta });

        res.json({ respuesta });
    } catch (error) {
        console.error("❌ Error al generar respuesta contextual:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
