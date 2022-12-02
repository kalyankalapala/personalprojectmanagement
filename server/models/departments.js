const mongoose = require("mongoose");

const departmentsSchema = new mongoose.Schema(
  {
    userId:{
        type:String
    },
    dName: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    dHead: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("departments", departmentsSchema);
