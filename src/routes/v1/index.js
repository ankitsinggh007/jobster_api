const express=require('express');

const jobRouter=require("./company.js");

const authRouter=require('./auth.js'); 


const v1Router=express.Router();



v1Router.use('/auth',authRouter);

v1Router.use('/jobs',jobRouter);


module.exports=v1Router;