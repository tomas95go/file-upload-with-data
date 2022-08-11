const express = require("express");
const app = express();
const multer = require("multer");
function fileFilter(req, file, cb) {
  const userExists = true;
  if (userExists) {
    req.fileValidationError = "No anda amego";
    return cb(null, false, new Error("No anda"));
  }
  cb(null, true);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "user-avatar"
);
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());

app.post("/", function (req, res, next) {
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.status(200).json({
        message: req.fileValidationError,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server ready on: http://localhost:${PORT}`);
});
