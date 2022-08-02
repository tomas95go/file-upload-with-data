const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));

app.post("/", (req, res) => {
  const { user, password, avatar } = req.body;
  const base64Data = avatar.replace(/^data:image\/png;base64,/, "");
  fs.writeFile("out.png", base64Data, "base64", (err) => {
    console.log(err);
  });
  const data = {
    user,
    password,
    avatar,
  };
  res.status(200).json({
    message: "Esta bien su codigo sr. :)",
  });
});

app.listen(PORT, () => {
  console.log(`Server ready on: http://localhost:${PORT}`);
});
