const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      file.originalname + Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extensionName = path.extname(file.originalname);
    cb(null,uniqueName+extensionName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;