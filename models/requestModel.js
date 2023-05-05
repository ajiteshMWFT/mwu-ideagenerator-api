const mongoose = require("mongoose");

const requestModel = mongoose.Schema(
    {
        ip: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },


    }
);

const Request = mongoose.model("Request", requestModel);

module.exports = Request;