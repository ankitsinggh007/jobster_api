const express=require('express');
require('dotenv').config();

const Connect=require('./src/config/databaseConfig.js');
const APP=express();
const mainRouter=require('./src/routes')
// Security pakages
const helmet=require('helmet');
const cors=require('cors');
const xss=require('xss-clean');
const rateLimiter=require('rate-limiter');



APP.set('trust proxy',1);

APP.use(rateLimiter({
    windowMs:15*60*1000,
    max:100,
})
);    

APP.use(express.json());
APP.use(express.urlencoded({extended:true}));
APP.use(helmet());
APP.use(cors());
APP.use(xss());


APP.use('/api',mainRouter);







const PORT=process.env.PORT ||5000;
 
const serverStarted=async()=>{
    try {
        await Connect(process.env.mongo_URI);
        
        APP.listen(PORT,()=>{
        console.log(`developemnt server is started on ${PORT}`);

        });
    } catch (error) {
        console.log(error);
    }
}
serverStarted();