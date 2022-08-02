const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "./public" });
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());

app.post("/", upload.single("user-avatar"), function (req, res, next) {
  const { "user-input": user, "user-password": password } = req.body;
  console.log(user, password, req.file);
  res.status(200).json({
    message: "Esta bien su codigo sr. :)",
  });
});

app.listen(PORT, () => {
  console.log(`Server ready on: http://localhost:${PORT}`);
});
