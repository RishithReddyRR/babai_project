const express=require('express');
require('dotenv').config({path:'./config/.env'})
const {connect}=require('./config/database')
const cookieParser=require('cookie-parser')
const bodyParser=require("body-parser")
const {errorMiddleware}=require('./middleware/error')
const {createUser, userLogin, logout} = require("./controllers/userController");
const { createTask, createSubTask, getUserTasks, getUserSubTasks, updateTask, updateSubTask, deleteTask, deleteSubTask } = require('./controllers/taskController');
const { isAuthenticatedUser } = require('./middleware/auth');





//conecting to mongodb
connect()

const app=express()
//middleware to parse body json
app.use(express.json({limit:"50mb"}))
//middleware to parse cookie
app.use(cookieParser())
//body parser to parse body
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))


//tasks apis

//creating a user
app.route('/register').post(createUser);
//login of user
app.route('/login').post(userLogin);
//logout
app.route('/logout').get(logout);
//creating a task #1st task given
app.route("/create-task").post(isAuthenticatedUser,createTask)
//creating a tsub ask #2nd task given
app.route("/create-sub-task").post(isAuthenticatedUser,createSubTask)
//getting all tasks of a user #3rd task
app.route("/get-user-tasks").get(isAuthenticatedUser,getUserTasks)
//getting all sub tasks of a user #4th task
app.route("/get-user-sub-tasks").get(isAuthenticatedUser,getUserSubTasks)
//updating tasks of a user #5th task
app.route("/task/update").post(isAuthenticatedUser,updateTask)
//updating sub tasks of a user #6th task
app.route("/sub_task/update").post(isAuthenticatedUser,updateSubTask)
//deleting task of a user #7th task
app.route("/task/delete").delete(isAuthenticatedUser,deleteTask)
//deleting sub task of a user #8th task
app.route("/sub_task/delete").delete(isAuthenticatedUser,deleteSubTask)


//middleware to handle the errors
app.use(errorMiddleware)
app.listen(process.env.PORT,()=>{
    console.log(`listening on port on http://localhost:${process.env.PORT}`)
})