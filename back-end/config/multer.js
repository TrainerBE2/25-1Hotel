const multer = require("multer");
const path = require("path");
const moment = require("moment");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    if (file.fieldname === "roomImage") {
      uploadPath = path.join(__dirname, "../public/uploads/rooms/");
    } else if (file.fieldname === "userImage") {
      uploadPath = path.join(__dirname, "../public/uploads/user/");
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const filename = `${timestamp}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
