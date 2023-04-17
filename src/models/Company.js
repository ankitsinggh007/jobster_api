const mongoose  = require("mongoose");

const CompanySchema=mongoose.Schema({

Company:{
    type:String,
    required:[true,'please provide company name'],
    maxlength:50,
},
position:{
    type:String,
    required:[true,'please provide company name'],
    maxlength:100,
},
status:{
    type:String,
    default:'pending',
    enum:["pending","interview","decline",]
},
createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:[true,'please provide user id']
}

},{timestamps:true});

const Company=mongoose.model('Company',CompanySchema);

module.exports=Company;