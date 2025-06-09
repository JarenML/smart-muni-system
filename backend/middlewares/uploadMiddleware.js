const multer = require("multer");
const path = require("path");

const uploadCurriculum = multer({ 
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/curriculos/");  // Subir los archivos a la carpeta 'uploads/curriculos/'
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);  
            const name = file.originalname.split(".")[0];  
            cb(null, `${Date.now()}-${name}${ext}`);  // Nombre único para el archivo
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },  // Limitar el tamaño a 5MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.pdf' && ext !== '.docx') {
            return cb(new Error("Solo se permiten archivos PDF o DOCX"));
        }
        cb(null, true);
    }
}).single("curriculumVitae");  // Usa 'curriculumVitae' como nombre del campo

const uploadTramite = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/tramites/");  // Subir los archivos a la carpeta 'uploads/tramites/'
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname).toLowerCase();  
            const name = file.originalname.split(".")[0];  
            cb(null, `${Date.now()}-${name}${ext}`);  // Nombre único para el archivo
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },  // Limitar el tamaño a 5MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.pdf' && ext !== '.docx') {
            return cb(new Error("Solo se permiten archivos PDF o DOCX"));
        }
        cb(null, true);
    }
}).single("tramiteFile");  // Usa 'tramiteFile' como nombre del campo


module.exports = { uploadCurriculum, uploadTramite };
