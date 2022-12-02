const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
    },
    subtaskTitle: {
      type: String,
      required: true,
    },
    subtaskDesc: {
      type: String,
    },
    date:{
      type:String
    } ,
       time: {
      type: String,
    },
    empId: {
      type: String,
    },
    status:{
      type: String,
      default: "uncompleted"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subtasks", subtaskSchema);
