const bcrypt=require('bcryptjs')
const { default: mongoose } = require("mongoose");
const JWT=require('jsonwebtoken');

require('dotenv').config();

const userSchema=mongoose.Schema({

name:{
    type:String,
    minLength:3,
    maxLength:20,
    required:[true,'please provide name']
},
email:{
        type:String,
        required:[true,'please provide email'],
        match:[/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/g,'Please provide a valid email'],
        unique:true,
},
password:{
    type:String,
    required:[true,'Please provide password'],
    minLength:[6,'Length must be at least 6 characters']
}


})

userSchema.pre('save',async function(){
   const SALT=await bcrypt.genSalt(10);
   this.password= await bcrypt.hash(this.password,SALT);     
})

userSchema.methods.genJWT = function() {
    return JWT.sign({id: this._id, name: this.name},process.env.Secret, {
        expiresIn: '1h'
    });
}
userSchema.methods.compare=async function(password,next){
    return await bcrypt.compare(password,this.password);
}

const UserModal=mongoose.model('UserModal',userSchema);

module.exports=UserModal;