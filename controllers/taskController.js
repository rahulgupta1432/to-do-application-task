const { where, Op } = require('sequelize');
const Task = require('../models/TaskModel');
const { User } = require('../models/UserModel');
const ErrorHandler = require('../utils/ErrorHandler');
const sendResponse = require('../utils/sendResponse');
exports.getAllTasks = async (req, res, next) => {
    try {
        const { search } = req.query;
        const query = {};
        if (search) {
            query[Op.or] = [
                { title: { [Op.like]: '%' + search + '%' } },
                { description: { [Op.like]: '%' + search + '%' } },
            ];
        }             const user=await User.findOne({where:{id:req.query.userId}});
        let tasks;
        if(user.isAdmin){
            tasks = await Task.findAll({ where: { ...query } });
        }else{
            tasks = (await Task.findAll({ where: { userId: req.query.userId,...query },include:[{
                model:User,
                attributes:{exclude:['password']}
            }] }));
        }
        sendResponse({
            res,
            message: "Tasks Fetched Successfully",
            data: tasks,
          });
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const { title, description,completed} = req.body;
        const { userId } = req.query;
        if(!userId){
            return next(new ErrorHandler("Please provide userId",400));
        }
        const checkUser=await User.findOne({where:{id:userId}});
        if(!checkUser){
            return next(new ErrorHandler("User not found",404));
        }

        const assignTask=await Task.create({ title, description, userId,completed });
        if(!assignTask){
            return next(new ErrorHandler("Task not created",400));
        }
        sendResponse({
            res,
            message: "Task Created Successfully",
            data: assignTask,
          });
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const { title, description, completed, taskId } = req.body;

        const checkUser = await User.findByPk(userId);
        if (!checkUser) {
            return next(new ErrorHandler("User not found", 404));
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }
        const [updatedRows] = await Task.update(
            {
                title,
                description,
                completed
            },
            {
                where: { id: taskId }
            }
        );
        if (updatedRows === 0) {
            return next(new ErrorHandler("Task not updated", 400));
        }

        const updatedTask = await Task.findByPk(taskId);
        sendResponse({
            res,
            message: "Task Updated Successfully",
            data: updatedTask
        });
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};



exports.deleteTask = async (req, res, next) => {
    try {
        const {taskId}=req.query;
        console.log("req",req.query);
        const task = await Task.findByPk(taskId);
        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }
        const deleteTask=await task.destroy();
        if(!deleteTask){
            return next(new ErrorHandler("Task not deleted",400));
        }
        sendResponse({
            res,
            message: "Task Deleted Successfully",
            data: [],
          });

    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
};

exports.toggleTaskCompletion = async (req, res, next) => {
    try {
        const { taskId } = req.query;
        const task = await Task.findByPk(taskId);
        if(!task){
            return next(new ErrorHandler("Task not found",404));
        }
        task.completed = !task.completed;
        const saveTask=await task.save();
        if(!saveTask){
            return next(new ErrorHandler("Task not updated",400));
        }
        sendResponse({
            res,
            message: "Task Updated Successfully",
            data: saveTask,
        })
        
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
};


exports.fetchAllTaskList=async(req,res,next)=>{
    try{
        const limit=parseInt(req.query.limit) || 10;
        const page=parseInt(req.query.page) || 1;
        const skip=(page-1)*limit;
        let data=[]
        const { search } = req.query;
        const query = {};
        if (search) {
            query[Op.or] = [
                { title: { [Op.like]: '%' + search + '%' } },
                { description: { [Op.like]: '%' + search + '%' } },
            ];
        }     
        data=await Task.findAll({where: query,limit:limit,offset:skip,include:[{
            model:User,
            attributes:{exclude:['password']}
        }]});
        if(!data){
            return next(new ErrorHandler("Tasks not found",404));
        }
        const pagination={};
        pagination.limit = limit;
    pagination.page=page;
    pagination.pages=Math.ceil(pagination.total/limit);
    pagination.nextPage=parseInt(page)<pagination.pages?parseInt(page)+1:null;
    pagination.prevPage=page>1?parseInt(page)-1:null;
    pagination.hasPrevPage=page>1;
    pagination.hasNextPage=page<pagination.pages;
    data.push(pagination);

        sendResponse({
            res,
            message: "Tasks Fetched Successfully",
            data: data,
          });
    }catch(error){
        return next(new ErrorHandler(error.message,500));
    }
}


exports.getAllUserTasks = async (req, res, next) => {
    try{
        const {userId}=req.query;
        const { search } = req.query;
        const query = {};
        if (search) {
            query[Op.or] = [
                { title: { [Op.like]: '%' + search + '%' } },
                { description: { [Op.like]: '%' + search + '%' } },
            ];
        }     
        if(!userId){
            return next(new ErrorHandler("Please provide userId",400));
        }
        const user=await User.findByPk(userId);
        if(!user){
            return next(new ErrorHandler("User not found",404));
        }
        const tasks=await Task.findAll({where:{userId,...query}});
        if(!tasks){
            return next(new ErrorHandler("Tasks not found",404));
        }
        sendResponse({
            res,
            message: "Tasks Fetched Successfully",
            data: tasks,
          });
    }catch(error){
        return next(new ErrorHandler(error.message,500));
    }
}




exports.assignTaskToUser = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const { mobile,title, description,completed} = req.body;
        if(!userId){
            console.log("userId",userId);
            return next(new ErrorHandler("Please provide userId",400));
        }
        const checkUser=await User.findOne({where:{id:userId}});
        if(!checkUser){
            return next(new ErrorHandler("User not found",404));
        }
        const checkMobile=await User.findOne({where:{mobile:mobile}});
        if(!checkMobile){
            return next(new ErrorHandler("Mobile number not found",404));
        }

        const assignTask=await Task.create({ title, description, completed,userId:checkUser.id });
        if(!assignTask){
            return next(new ErrorHandler("Task not created",400));
        }
        sendResponse({
            res,
            message: "Task Assign to the User Successfully",
            data: assignTask,
          });
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
};