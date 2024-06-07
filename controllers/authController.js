const {validateUser,User, loginValidate}=require("../models/UserModel");
const bcrypt = require('bcrypt');
const ErrorHandler=require("../utils/ErrorHandler.js");
const sendResponse=require("../utils/sendResponse.js");
const { generateToken } = require("../utils/generateToken.js");



exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password,isAdmin,mobile } = req.body;
        const valid=await validateUser(req.body);
        if(!valid||(valid&&valid.error)){
            console.log("valid",valid.error)
            return next(new ErrorHandler(valid.error,400))
        }
        const checkEmail=await User.findOne({where:{email:email}});
        if(checkEmail){
            console.log("checkEmail",checkEmail)
            return next(new ErrorHandler("User Already Existed",404))
        }
        let user;
        user= await User.create({ name, email, password,isAdmin,mobile });
        const token=await generateToken(user.id,user.isAdmin);
        user.password=undefined;
        const data={...user.dataValues,token}
        sendResponse({
            res,
            message: "User Register Successfully",
            data: data,
          });
    } catch (error) {
        return next(new ErrorHandler(error.message,500));
    }
};

exports.loginUser =async (req, res, next) => {
    try{
        const {email,password}=req.body;
        const valid=await loginValidate(req.body);
        if(!valid||(valid&&valid.error)){
            return next(new ErrorHandler(valid.error,400))
        }
        let checkEmail=await User.findOne({where:{email:email}});
        if(!checkEmail){
            return next(new ErrorHandler("Email Id not found",404));
        }
        const matchPassword=await bcrypt.compare(password,checkEmail.password);
        if(!matchPassword){
            return next(new ErrorHandler("Invalid Password",400));
        }
        checkEmail.password=undefined;
        let token=await generateToken(checkEmail.id,checkEmail.isAdmin);
        let data={
            ...checkEmail.dataValues,
            token,
        }
        sendResponse({
            res,
            message: "User Login Successfully",
            data: data,
          });
        
    }catch(error){
        return next(new ErrorHandler(error.message,500));
    }
};

exports.logoutUser = (req, res) => {
    try{
        res.clearCookie("token");
        sendResponse({
            res,
            message: "User Logout Successfully",
          });
    }catch(error){
        return next(new ErrorHandler(error.message,500));
    }
};
