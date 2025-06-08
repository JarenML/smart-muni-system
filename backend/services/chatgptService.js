const axios = require('axios');
require('dotenv').config();

const consultarChatGPT = async (messages) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages, // ahora recibe directamente un arreglo de mensajes
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("❌ Error al consultar OpenAI:", error.response?.data || error.message);
        return "Hubo un error consultando a la IA.";
    }
};

module.exports = { consultarChatGPT };
