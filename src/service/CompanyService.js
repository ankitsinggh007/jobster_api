const CompanyRepo = require("../repository/Company-repo");

class CompanySevice{

    constructor(){
        this.companyRepo=new CompanyRepo();
    }

    async createJobTemp(data){
        try {
            const createdBy=data.user._id;
            const {Company,position,status}=data.body;
            const parsedData={Company,position,status,createdBy}
            
            const response=await this.companyRepo.create(parsedData);
            return response;
        } catch (error) {
            console.log("something went wrong in service layer");
        }
    }
    async deletejobTemp(id){
        try {
            const response=await this.companyRepo.destroy(id);
            return response;
        } catch (error) {
            console.log("something went wrong in service layer");
        }
    }
   
    async getAllJobs(data){
        try {
        
            const response=await this.companyRepo.getAll(data);
            console.log(response,"response");
            return response;
        } catch (error) {
            console.log("something went wrong in service layer");
        }
    }

    async updateJobs(id,data){
        try {
        
            const response=await this.companyRepo.update(id,data);
            return response;
        } catch (error) {
            console.log("something went wrong in service layer");
        }
    }
}
module.exports=CompanySevice;