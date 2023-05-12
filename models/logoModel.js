const mongoose = require("mongoose");

const LogoModel = mongoose.Schema(
  {
    ip: String,
    prompt: String,
    logo: String,
    timestamp: { type: Date, default: Date.now }
  }
);

const Logo = mongoose.model("Logo", LogoModel);

module.exports = Logo;