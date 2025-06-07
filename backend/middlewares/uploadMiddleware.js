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

const upload = multer({ storage });

module.exports = upload;
