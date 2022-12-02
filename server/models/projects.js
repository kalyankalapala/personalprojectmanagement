const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    projName: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    githubRepo: {
      type: String,
    },
    
    cost: {
        type: Number,
        
      },
      completed:{
        type: Number,
        default: 0
      }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("projects", projectSchema);
