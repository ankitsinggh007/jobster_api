const UserModal = require("../models/User");
const UserService = require("../service/UserService");
require('dotenv').config();
const JWT=require('jsonwebtoken');
const userService=new UserService();

const signUp=async(req,res)=>{
try {
    const response=await userService.signup({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    })
    return res.status(201).json({
       sucess:true,
       message:'Successfully created a new user',
       data:response,
       err:{}
    });
} catch (error) {
    return res.status(500).json({
        message: 'Something went wrong',
        data: {},
        success: false,
        err: error
    });
}
}

const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email|| !password){
            throw new Error(email?"Please provide password":"Please provide email");
        }
        const response=await userService.login({email,password});

        res.status(200).json({
            success:true,
            message:"succesfully login",
            response:response,
            error:{}
        })
    } catch (error) {
            res.status(500).json({
                message: error.message,
                data: {},
                success: false,
                err: error
            })
    }
}
module.exports ={
    signUp,Login
}