const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to home");
});

// route example: /items?name=sword
app.get("/items", (req, res) => {
  // const name = req.query.name

  // Destructure the name object from the query
  const { name } = req.query;

  res.send(`Item name is: ${name}`);
});

// route example: /items/2
app.get("/items/:id", () => {
  // const id = req.params.id

  // Destructure the id object from the params
  const { id } = req.params;

  res.send(`Item id: ${id}`);
});

app.listen(5000, () => {
  console.log("Listening at http://localhost:5000");
});
