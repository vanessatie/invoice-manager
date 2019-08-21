const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const api = require("./server-api");

const app = express();
app.use(express.json());

dotenv.config();

try {
  const localConfig = dotenv.parse(fs.readFileSync(".env.local"));
  process.env = {
    ...process.env,
    ...localConfig
  };
} catch (error) {}

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, "build")));

api(app);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "/public/index.html"));
});

app.listen(process.env.PORT || 4000);
