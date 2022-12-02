const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema(
  {
    empName: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    depId: {
      type: String,
    },
    salary: {
        type: Number,
      },
        
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employees", employeesSchema);
