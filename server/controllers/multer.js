const multer = require("multer");
const fs = require("fs");


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, "uploads/");
        const uploadDir = "uploads/";
        fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the directory exists
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    },
});

const upload = multer({ storage: storage,limits: {
    fileSize: 50 * 1024 * 1024, // Set your desired file size limit
} });
module.exports = upload;
