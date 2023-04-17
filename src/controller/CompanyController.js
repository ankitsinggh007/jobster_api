const CompanySevice = require("../service/CompanyService");

const companyservice=new CompanySevice();

const createjob=async (req,res)=>{
try {
    const response=companyservice.createJobTemp(req);

    return res.status(201).json({
        success:true,
        message:"job successfully created",
        data:response,
        error:{},
    })

} catch (error) {
    return res.status(500).json({
        success:false,
        message:`${error.message}}`,
        data:[],
        error:error,
    })
}
}
const getAllJob=async(req,res)=>{
    try {
        const response= await companyservice.getAllJobs({createdBy:req.user._id});
    
    return res.status(200).json({
        success:true,
        message:'all jobs were successfully fetched',
        data:response,
        error:{}
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`${error.message}`,
            data:[],
            error:error
        }); 
    }
}

const updateJob=async(req,res)=>{
    try {
        const userId=req.user._id;
        const {Company,status,position}=req.body;
        if(Company==" "||position==" "){
            throw new Error(`Company name can'tbe null` );
        }
        const requestedData=await companyservice.updateJobs({id:req.params.id,data:req.body})
    
        return res.status(200).json({
            success:true,
            message:'jobs has been updated successfully',
            data:requestedData,
            error:{}
        });
    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`${error.message}`,
            data:[],
            error:error
        }); 
    }
}


const deletejob=async (req,res)=>{
    try {
        const {id}=req.params;
        const userId=req.user._id;
        console.log(userId,"userId");
        console.log(id,"id");
        let response=await companyservice.getAllJobs({createdBy:userId,_id:id});
        if(response.length==0) throw new Error('resource not found');
        response =await companyservice.deletejobTemp(id);
        return res.status(200).json({
            success:true,
            message:"successfully deleted the job",
            data:response,
            error:{},
        })
    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`${error.message}`,
            data:[],
            error:error,
        })
    }
    }
module.exports={
    createjob,deletejob,getAllJob,updateJob
}