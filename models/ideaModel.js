const mongoose = require("mongoose");

const ideaModel = mongoose.Schema(
  {
    ip: String,
    prompt: String,
    idea: String,
    timestamp: { type: Date, default: Date.now }
  }
);

const Idea = mongoose.model("Idea", ideaModel);

module.exports = Idea;