const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  company: String,
  project: String,
  amount: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  file: String
});

module.exports = mongoose.model("Card", cardSchema);
