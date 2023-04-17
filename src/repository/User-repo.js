const UserModal = require("../models/User");
const CrudRepo = require("./Crud");

class UserRepository extends CrudRepo{

    constructor(){
        super(UserModal);
    }

    async findBy(data){
        try{
            const response=await UserModal.findOne({email:data});
            
            return response;
        }
        catch(error){
            console.log(`something went wrong in User-repo ${error.message}`);

        }
    }
}
module.exports=UserRepository;