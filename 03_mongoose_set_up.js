const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to mongoose server
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/name-goes-here");
}

app.listen(5000, () => {
  console.log("Listening at http://localhost:5000");
});
