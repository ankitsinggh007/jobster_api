const UserRepo = require("../repository/User-repo.js");
const Jwt=require('jsonwebtoken');
class UserService{
    constructor(){
    this.UserRepo = new UserRepo();
    }
async signup(data){
    try {
        const user=await this.UserRepo.create(data);
        console.log("token")
    return {name:user.name,email:user.email};
    } catch (error) {
        throw error;
    }
}
async login(data){
    try{
        const response=await this.UserRepo.findBy(data.email);
        if(!response){
            throw new Error("email is not valid");
        }
        const isPasswordMatch=await response.compare(data.password);
        if(!isPasswordMatch){
            throw new Error("password is not matched");

        }
     const token=response.genJWT();
     return {token,name:response.name};

    }
    catch(error){ 
        throw error;

    }
}
 async findOne(data){
        try {
            const response=await this.UserRepo.get(data);
            return response;
        } catch (error) {
            throw error;
        }
 }
}
module.exports=UserService;