const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },
    taskName: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    desc: {
      type: String,
    },
    depId:{
      type:String
    },
    status:{
      type: String,
      default:"uncompleted"
    }
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tasks", projectSchema);
