const mongoose = require("mongoose");
const Request = require("../models/requestModel");

const rateLimit = async (req, res, next) => {
    const ip = req.ip;
  
    // Find the number of requests made from the current IP address
    const count = await Request.countDocuments({ ip });
  
    // If the limit has been exceeded, send a 429 Too Many Requests response
    if (count >= 5) {
      return res.status(429).json({ error: 'you can not generate ideas more than five times' });
    }
  
    // Create a new request document in the database
    await Request.create({ ip });
  
    // Call the next middleware function or route handler
    next();
  };

  module.exports = {rateLimit}