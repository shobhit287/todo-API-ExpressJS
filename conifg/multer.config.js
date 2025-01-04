const multer = require("multer");
const FILE_SIZE_IN_MB = 10
const WithoutFileUpload = multer().none();

const WithSingleFileUpload = multer({
  storage: multer.memoryStorage(), 
  limits: { fileSize: FILE_SIZE_IN_MB * 1024 * 1024 }
}).single("file");

const multiFileUpload = multer({
  storage: multer.memoryStorage(), 
  limits: { fileSize: FILE_SIZE_IN_MB * 1024 * 1024 }
}).array('files');

module.exports = {
    WithoutFileUpload,
    WithSingleFileUpload,
    multiFileUpload
};