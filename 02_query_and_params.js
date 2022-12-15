const express = require("express");

const app = express();

// QUERIES

// route example:       /items?name=sword
// route example2:      /items?name=sword&damage=5
app.get("/items", (req, res) => {
  // Destructure the name and damage keys from the query object.
  const { name, damage } = req.query;

  let message = "There is no name or damage in the request.";

  // If name or damage exist in the query, change the message.
  if (name && damage) {
    message = `The items name is: ${name} and it does ${damage} damage.`;
  } else if (name) {
    message = `The items name is: ${name}`;
  }

  // Send message as a response
  res.send(message);
});

// PARAMS

// route example: /items/2
// route example: /items/10
app.get("/items/:id", (req, res) => {
  // Destructure the id key from the params object.
  const { id } = req.params;

  res.send(`Item id: ${id}`);
});

app.listen(5000, () => {
  console.log("Listening at http://localhost:5000");
});
