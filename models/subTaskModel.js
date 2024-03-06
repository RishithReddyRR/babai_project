const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
  updated_at: String,
  deleted_at: String,
});
module.exports = mongoose.model("SubTask", subTaskSchema);
