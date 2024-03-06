const { asyncErrorHandler } = require("../middleware/catchAsyncError");
const task = require("../models/taskModel");
const subTask = require("../models/subTaskModel");

//creating a task
exports.createTask = asyncErrorHandler(async (req, res, next) => {
  let td = new Date();
  const date = td.getDate();
  const month = td.getMonth();
  const year = td.getFullYear();
  td = new Date(
    `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${
      date < 10 ? `0${date}` : date
    }`
  ).getTime();
  //due_date must be sent in "yyyy-mm-dd" format
  const dd = new Date(req.body.due_date).getTime();
  const nod = Number((dd - td) / (24 * 60 * 60 * 1000));

  let priority;
  if (nod == 0) {
    priority = 0;
  } else if (nod == 1 || nod == 2) {
    priority = 1;
  } else if (nod == 3 || nod == 4) {
    priority = 2;
  } else {
    priority = 3;
  }
  const t = await task.create({
    ...req.body,
    user_id: req.user._id,
    priority,
  });

  res.status(200).json({
    success: true,
    task: t,
  });
});
//creating a sub task
exports.createSubTask = asyncErrorHandler(async (req, res, next) => {
  const t = await subTask.create({ ...req.body, user_id: req.user._id });
  res.status(200).json({
    success: true,
    task: t,
  });
});

//getting all tasks
exports.getUserTasks = asyncErrorHandler(async (req, res, next) => {
  const tasks = await task.find({ user_id: req.user._id });
  res.status(200).json({
    success: true,
    tasks,
  });
});
//getting all sub tasks
exports.getUserSubTasks = asyncErrorHandler(async (req, res, next) => {
  const sub_tasks = await subTask.find({ user_id: req.user._id });
  res.status(200).json({
    success: true,
    sub_tasks,
  });
});
//updaing tasks
exports.updateTask = asyncErrorHandler(async (req, res, next) => {
  const t = await task.updateOne({_id:req.body.task_id},{$set:{status:"DONE"}});
  res.status(200).json({
    success: true,
    task:t,
  });
});
//updaing sub tasks
exports.updateSubTask = asyncErrorHandler(async (req, res, next) => {
  const t = await subTask.updateOne({_id:req.body.sub_task_id},{$set:{status:1}});
  res.status(200).json({
    success: true,
    task:t,
  });
});
//deleting tasks
exports.deleteTask = asyncErrorHandler(async (req, res, next) => {
  const t = await task.findByIdAndDelete(req.body.task_id)
  res.status(200).json({
    success: true,
    task:t,
  });
});
//deleting sub tasks
exports.deleteSubTask = asyncErrorHandler(async (req, res, next) => {
  const t = await subTask.findByIdAndDelete(req.body.sub_task_id)
  res.status(200).json({
    success: true,
    task:t,
  });
});
