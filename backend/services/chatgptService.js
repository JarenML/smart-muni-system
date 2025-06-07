const axios = require('axios');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const consultarChatGPT = async (mensajeUsuario) => {
    try {
        const respuesta = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', // puedes cambiar a 'gpt-3.5-turbo' si tu plan solo lo incluye
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un asistente virtual que responde dudas sobre trámites municipales.'
                    },
                    {
                        role: 'user',
                        content: mensajeUsuario
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return respuesta.data.choices[0].message.content;
    } catch (error) {
        console.error("❌ Error al consultar OpenAI:", error.response?.data || error.message);
        return "Lo siento, hubo un error al procesar tu consulta.";
    }
};

module.exports = { consultarChatGPT };
