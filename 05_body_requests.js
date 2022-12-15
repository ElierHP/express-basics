const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./model/Todo");

const app = express();

// Connect Server
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/express-delete");
}

// Config
app.use(cors());
app.use(express.json());

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

app.post("/todos", async (req, res) => {
  try {
    await Todo.create({ name: req.body.name });
    res.send({ status: 201, message: "successfully created todo." });
  } catch (error) {
    res.send({ status: 404, message: "failed to create todo." });
  }
});

app.listen(5000, () => {
  console.log("listening at port 5k");
});
