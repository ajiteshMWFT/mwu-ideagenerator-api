const mongoose = require("mongoose");

const ideaModel = mongoose.Schema(
    {
      ipAddress:{
        type:String
      },
      ideas:[{
        type:String,
        
        
      }]
    }
  );
  
  const Idea = mongoose.model("Idea", ideaModel);
  
  module.exports = Idea;