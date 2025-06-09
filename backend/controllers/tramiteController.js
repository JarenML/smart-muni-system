const { Tramite, EstadoTramiteHistorial, User } = require("../models");
const PDFDocument = require("pdfkit");

// Crear nuevo trámite (ciudadano)
const crearTramite = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const user_id = req.user.id;
        const archivo_url = req.file ? `/uploads/tramites/${req.file.filename}` : null;

        // Clasificación automática (simulada)
        let tipo_detectado = "Otros";
        let prioridad = "baja";
        const texto = `${titulo} ${descripcion}`.toLowerCase();

        if (texto.includes("licencia")) {
            tipo_detectado = "Licencia de Funcionamiento";
            prioridad = "media";
        } else if (texto.includes("construcción") || texto.includes("construccion")) {
            tipo_detectado = "Permiso de Construcción";
            prioridad = "alta";
        } else if (texto.includes("evento")) {
            tipo_detectado = "Autorización de Evento";
            prioridad = "media";
        } else if (texto.includes("reclamo") || texto.includes("queja")) {
            tipo_detectado = "Reclamo de Servicio Público";
            prioridad = "alta";
        }

        const nuevo = await Tramite.create({
            titulo,
            descripcion,
            archivo_url,
            user_id,
            estado: "recibido",
            tipo_detectado,
            prioridad
        });

        res.status(201).json({
            message: "Trámite registrado correctamente",
            tramite: nuevo
        });
    } catch (error) {
        console.error("Error al registrar trámite:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener mis trámites (ciudadano)
const obtenerMisTramites = async (req, res) => {
    try {
        const user_id = req.user.id;

        const tramites = await Tramite.findAll({
            where: { user_id },
            order: [["creado_en", "DESC"]]
        });

        res.json(tramites);
    } catch (error) {
        console.error("Error al obtener trámites:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todos los trámites (solo admin)
const obtenerTodosTramites = async (req, res) => {
    try {
        const tramites = await Tramite.findAll({
            order: [["creado_en", "DESC"]]
        });

        res.json(tramites);
    } catch (error) {
        console.error("Error al obtener trámites:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar estado del trámite (admin)
const actualizarEstadoTramite = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado_nuevo, descripcion } = req.body;

        const tramite = await Tramite.findByPk(id);
        if (!tramite) return res.status(404).json({ message: "Trámite no encontrado" });

        const estadosValidos = ["recibido", "en_revision", "observado", "resuelto", "rechazado"];
        if (!estadosValidos.includes(estado_nuevo)) {
            return res.status(400).json({ message: "Estado inválido" });
        }

        tramite.estado = estado_nuevo;
        tramite.actualizado_en = new Date();
        await tramite.save();

        await EstadoTramiteHistorial.create({
            tramite_id: tramite.id,
            estado_nuevo,
            descripcion
        });

        // ✅ Crear notificación antes de responder
        const { Notificacion } = require("../models");
        await Notificacion.create({
            user_id: tramite.user_id,
            tramite_id: tramite.id,
            mensaje: `El estado de tu trámite "${tramite.titulo}" ha cambiado a "${estado_nuevo}".`
        });

        res.json({ message: "Estado actualizado correctamente", tramite });
    } catch (error) {
        console.error("Error actualizando estado:", error);
        res.status(500).json({ message: "Error interno" });
    }
};


// Obtener historial de estados
const obtenerHistorialTramite = async (req, res) => {
    try {
        const { id } = req.params;
        const historial = await EstadoTramiteHistorial.findAll({
            where: { tramite_id: id },
            order: [["fecha", "DESC"]]
        });

        res.json(historial);
    } catch (error) {
        console.error("Error al obtener historial:", error);
        res.status(500).json({ message: "Error interno al obtener historial" });
    }
};

// Generar y descargar historial en PDF
const descargarHistorialPDF = async (req, res) => {
    try {
        const { id } = req.params;
        const tramite = await Tramite.findByPk(id, {
            include: [{ model: User, attributes: ["nombre", "email"] }]
        });

        if (!tramite) return res.status(404).json({ message: "Trámite no encontrado" });

        const historial = await EstadoTramiteHistorial.findAll({
            where: { tramite_id: id },
            order: [["fecha", "ASC"]]
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=historial_tramite_${id}.pdf`);

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(16).text(`Historial de Trámite N.º ${id}`, { align: "center" }).moveDown();
        doc.fontSize(12)
            .text(`Ciudadano: ${tramite.User.nombre}`)
            .text(`Email: ${tramite.User.email}`)
            .text(`Título del trámite: ${tramite.titulo}`)
            .text(`Descripción: ${tramite.descripcion}`)
            .text(`Estado actual: ${tramite.estado}`)
            .text(`Creado: ${tramite.creado_en}`).moveDown();

        doc.text("Historial de Estados:", { underline: true }).moveDown();

        historial.forEach((item, i) => {
            doc.text(`${i + 1}. ${item.estado_nuevo.toUpperCase()}`)
                .text(`   Fecha: ${item.fecha}`);
            if (item.descripcion) doc.text(`   Descripción: ${item.descripcion}`);
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (error) {
        console.error("Error generando PDF:", error);
        res.status(500).json({ message: "Error interno al generar PDF" });
    }
};



module.exports = {
    crearTramite,
    obtenerMisTramites,
    obtenerTodosTramites,
    actualizarEstadoTramite,
    obtenerHistorialTramite,
    descargarHistorialPDF
};
