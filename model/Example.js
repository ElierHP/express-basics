const mongoose = require("mongoose");

// Create a schema(aka blueprint) for your model.
const exampleSchema = new mongoose.Schema({
  // Can set a type and additional options to each item
  name: {
    type: String,
    required: true,
  },
  message: String,
  completed: Boolean,
});

// Create a model with your schema.
const Example = mongoose.model("Todo", exampleSchema);

module.exports = Example;
