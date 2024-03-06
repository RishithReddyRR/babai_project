const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  due_date: String,
  status:{
    type:String,
    enum:["TODO","DONE"],
    default:"TODO"
  },
  priority: {
    type: Number,
    enum: [0, 1, 2, 3],
  },
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
});

module.exports = mongoose.model("Task", taskSchema);

