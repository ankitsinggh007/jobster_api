const express=require('express');
const { createjob,deletejob, getAllJob, updateJob } = require('../../controller/CompanyController');
const AuthMiddlware = require('../../middleware/auth-middleware');

const router=express.Router();


router.post('/creates',AuthMiddlware,createjob);
router.get('/delete/:id',AuthMiddlware,deletejob);
router.get('/',AuthMiddlware,getAllJob);
router.put('/update/:id',AuthMiddlware,updateJob);

module.exports = router;