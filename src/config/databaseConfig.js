const mongoose=require('mongoose');
const Connect=async(url)=>{
        return mongoose.connect(url);
}

module.exports=Connect;