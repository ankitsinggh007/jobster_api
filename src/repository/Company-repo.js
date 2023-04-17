const Company = require("../models/Company");
const CrudRepo = require("./Crud");

class CompanyRepo extends CrudRepo{
    
constructor(){
    super(Company);
}    
}

module.exports=CompanyRepo;