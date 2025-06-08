const { Tramite } = require("../models");
const { consultarChatGPT } = require("../services/chatgptService");

exports.preguntarConContexto = async (req, res) => {
    try {
        const { mensaje } = req.body;

        if (!mensaje) {
            return res.status(400).json({ message: "El mensaje es requerido" });
        }

        // 1. Consultar todos los trámites (puedes limitar si hay muchos)
        const tramites = await Tramite.findAll({
            attributes: ["id", "titulo", "estado", "prioridad", "tipo_detectado", "creado_en"]
        });

        // 2. Convertir en texto estructurado para el prompt
        const resumen = tramites.map(t =>
            `Trámite ${t.id}: ${t.titulo} (${t.tipo_detectado}) - prioridad ${t.prioridad}, estado: ${t.estado}, creado el ${t.creado_en}`
        ).join('\n');

        // 3. Crear contexto + pregunta del usuario
        const contexto = `
Eres un asistente virtual inteligente para una municipalidad. A continuación tienes una lista de trámites registrados:

${resumen}

Ahora responde la siguiente pregunta del usuario basándote solo en esta información:

Usuario: ${mensaje}
        `;

        // 4. Enviar a OpenAI
        const respuesta = await consultarChatGPT(contexto);

        res.json({ respuesta });
    } catch (error) {
        console.error("❌ Error en chatbot con contexto:", error);
        res.status(500).json({ message: "Error interno del asistente" });
    }
};