const { uploadCurriculum } = require("../middlewares/uploadMiddleware");
const { Curriculo, User } = require("../models");
const fs = require("fs");
const { consultarChatGPT } = require("../services/chatgptService");
const pdfParse = require('pdf-parse');
const mammoth = require("mammoth"); 

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

        const curriculo = await Curriculo.findByPk(id, {
            include: [{
                model: User, 
                attributes: ['id', 'nombre', 'email', 'telefono', 'direccion']
            }]
        });

        if (!curriculo) {
            return res.status(404).json({ message: "Currículum no encontrado" });
        }

        res.json(curriculo);
    } catch (error) {
        console.error("Error al obtener currículum:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Subir un nuevo currículum
exports.createCurriculo = async (req, res) => {
    // Usamos el middleware 'upload' para manejar el archivo subido
    uploadCurriculum(req, res, async (err) => {  
        if (err) {
            return res.status(400).json({ message: "Error al cargar el archivo" });
        }

        // Extraer los campos del formulario
        const { cargo_postula, anios_experiencia, educacion } = req.body;
        const archivo_url = req.file.path;

        // Validaciones
        if (!cargo_postula || !anios_experiencia || !educacion || !archivo_url) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        try {
            const userId = req.user.id;

            // Extraer el contenido del archivo (PDF o DOCX)
            let texto_extraido = "";

            if (archivo_url.endsWith(".pdf")) {
                // Si es un archivo PDF
                const pdfBuffer = fs.readFileSync(archivo_url);
                const pdfData = await pdfParse(pdfBuffer);
                texto_extraido = pdfData.text;
            } else if (archivo_url.endsWith(".docx")) {
                const docxBuffer = fs.readFileSync(archivo_url);
                try {
                    // Usamos mammoth para extraer el texto
                    const result = await mammoth.extractRawText({ buffer: docxBuffer });
                    texto_extraido = result.value;  // Extraer solo el texto
                } catch (err) {
                    return res.status(500).json({ message: "Error al procesar el archivo DOCX", error: err.message });
                }
            }

            // Consultar a ChatGPT para la evaluación de IA y puntaje
            const prompt = [
                    {
                        role: "system",
                        content: "Eres un asistente virtual de recursos humanos. Evalúa currículos en español, proporciona una evaluación detallada del perfil profesional y asigna un puntaje numérico del 0 al 100 según la calidad y adecuación del currículum. El formato de tu respuesta debera ser el siguiente, usa un '#' para separar ambas respuestas: 'evaluacion_ia: (aqui debera ir tu evaluacion no excedas los 100 caracteres de respuesta para la evaluacion y el sentido de la oracion no debe cortarse sino que deberas terminar la oracion con logica) # puntuacion_ia: (aqui ira la puntuacion del 1 al 100)'"
                    },
                    { role: "user", content: texto_extraido }
            ];

            const respuesta = await consultarChatGPT(prompt);  

            console.log("RESPUESTA:", respuesta);
            // Procesar la respuesta de ChatGPT
            const [evaluacion_ia, puntaje_ia] = respuesta.split("#");
            const clearEvaluacionIA = evaluacion_ia.replace("evaluacion_ia:", "").trim();
            const clearPuntajeIA = Number(puntaje_ia.replace("puntuacion_ia:", "").trim());
            console.log("CLEAR EVALUACION IA: ", clearEvaluacionIA);
            console.log("CLEAR PUNTAJE IA: ", clearPuntajeIA);

            // Crear el currículum en la base de datos
            const nuevoCurriculo = await Curriculo.create({
                user_id: userId,
                archivo_url: archivo_url,
                cargo_postula: cargo_postula,
                anios_experiencia: parseInt(anios_experiencia),
                educacion: educacion,
                evaluacion_ia: clearEvaluacionIA,
                puntaje_ia: clearPuntajeIA,
                estado: "recibido"  
            });

            res.json({ message: "Currículum creado exitosamente", curriculo: nuevoCurriculo });
        } catch (error) {
            console.error("Error al crear currículum:", error);
            res.status(500).json({ message: "Error interno al procesar el currículum" });
        }
    });
};