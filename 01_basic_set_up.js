const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to home");
});

app.listen(5000, () => {
  console.log("Listening at http://localhost:5000");
});
