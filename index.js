const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./model/Todo");

const app = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/express-delete");
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Queries "/practice?api_key=123456"
app.get("/practice", (req, res) => {
  const query = req.query;

  res.send({ name: "practice", status: 200, api_key: query.api_key });
});

// Params "/practice/1"
app.get("/practice/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  res.send({ id });
});

// BASIC CRUD ROUTES - Create, Read, Update, Delete
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (error) {
    res.send("Data not found");
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.send(todo);
  } catch (error) {
    res.send("Error: todo not found");
  }
});

app.post("/todos", async (req, res) => {
  if (req.query.name) {
    const todo = await Todo.create({ name: req.query.name });
    res.send(todo);
  } else {
    res.send("Error, no query was provided.");
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.send("successfuly deleted");
  } catch (error) {
    res.send("Error, failed to delete.");
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, {
      name: req.query.name,
    });
    res.send("Successfully updated the todo item.");
  } catch (error) {
    res.send("Error, failed to update.");
  }
});

app.listen(5500, () => {
  console.log("Server running in port 5000.");
});
