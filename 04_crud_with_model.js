const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Example = require("./model/Example");

const app = express();

// Connect to mongoose server
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/name-goes-here");
}

// CONFIG
app.use(cors());
app.use(express.json());

// ROUTES
// GET /example
app.get("/example", async (req, res) => {
  const examples = await Example.find({});

  res.send(examples);
});

//GET /example/1
app.get("/example/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const example = await Example.findById(id);

    res.send(example);
  } catch (error) {
    res.send({ status: 404, message: "Item not found." });
  }
});

// POST /example
app.post("/example", async (req, res) => {
  // Destructure name,message,completed from the body request.
  const { name, message, completed } = req.body;

  try {
    await Example.create({ name, message, completed });

    res.send({ status: 201, message: "Successfully created an example." });
  } catch (error) {
    res.send({ status: 404, message: "Unable to create new example." });
  }
});

// PATCH /example/1
app.patch("/example/:id", async (req, res) => {
  const { name, message, completed } = req.body;
  const { id } = req.params;

  try {
    // first param is the id, second is the update coming from the body request.
    await Example.findByIdAndUpdate(id, { name, message, completed });

    res.send({ status: 200, message: "Successfully updated." });
  } catch (error) {
    res.send({ status: 404, message: "Unable to update example." });
  }
});

// DELETE /example/1
app.delete("/example/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Example.findByIdAndDelete(id);

    res.send({ status: 204, message: "Successfully deleted example." });
  } catch (error) {
    res.send({ status: 404, message: "Failed to delete example." });
  }
});

app.listen(5000, () => {
  console.log("Listening at http://localhost:5000");
});
