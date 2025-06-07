const axios = require("axios");

exports.responderDuda = async (req, res) => {
    const { pregunta } = req.body;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", // o gpt-4 si tienes acceso
                messages: [
                    { role: "system", content: "Eres un asistente municipal que responde dudas frecuentes sobre trámites del municipio." },
                    { role: "user", content: pregunta }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer TU_API_KEY_DE_OPENAI`,
                    "Content-Type": "application/json"
                }
            }
        );

        const respuesta = response.data.choices[0].message.content;
        res.json({ respuesta });
    } catch (error) {
        console.error("Error al contactar a OpenAI:", error.message);
        res.status(500).json({ message: "No se pudo obtener respuesta del asistente" });
    }
};
