const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");  
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);  
        const name = file.originalname.split(".")[0];  
        cb(null, `${Date.now()}-${name}${ext}`);  
    }
});

// Middleware para cargar el currículum (campo "curriculumVitae")
const uploadCurriculum = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // Limitar el tamaño a 5MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.pdf' && ext !== '.docx') {
            return cb(new Error("Solo se permiten archivos PDF o DOCX"));
        }
        cb(null, true);
    }
}).single("curriculumVitae");  // Usa 'curriculumVitae' como nombre del campo

// Middleware para cargar un archivo de trámite (campo "archivo")
const uploadTramite = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // Limitar el tamaño a 5MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.pdf' && ext !== '.docx') {
            return cb(new Error("Solo se permiten archivos PDF o DOCX"));
        }
        cb(null, true);
    }
}).single("tramiteFile");  // Usa 'archivo' como nombre del campo

module.exports = { uploadCurriculum, uploadTramite };
